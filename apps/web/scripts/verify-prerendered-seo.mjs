import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appDirectory = resolve(scriptDirectory, '..');
const browserDirectory = join(appDirectory, 'dist', 'web', 'browser');
const siteOrigin = 'https://tucuentaclara.es';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function getVisibleFaqs(document) {
  const articleFaqs = [...document.querySelectorAll('.guide-faq details')].map(item => ({
    question: item.querySelector('summary')?.textContent?.trim() ?? '',
    answer: item.querySelector('p')?.textContent?.trim() ?? ''
  }));
  if (articleFaqs.length > 0) return articleFaqs;

  const calculatorGuide = document.querySelector('.calculator-guide');
  const faqHeading = [...(calculatorGuide?.querySelectorAll('h2') ?? [])]
    .find(heading => heading.textContent?.trim() === 'Preguntas frecuentes');
  const faqs = [];
  let element = faqHeading?.nextElementSibling ?? null;
  while (element && element.tagName !== 'H2') {
    if (element.tagName === 'H3') {
      const answer = element.nextElementSibling;
      assert(answer?.tagName === 'P', 'Cada pregunta visible de calculadora debe tener una respuesta inmediata.');
      faqs.push({
        question: element.textContent?.trim() ?? '',
        answer: answer.textContent?.trim() ?? ''
      });
    }
    element = element.nextElementSibling;
  }
  return faqs;
}

function getStructuredFaq(graph) {
  const faqNode = graph['@graph'].find(node => node['@type'] === 'FAQPage');
  return (faqNode?.mainEntity ?? []).map(item => ({
    question: item.name,
    answer: item.acceptedAnswer?.text
  }));
}

function pageFileFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  return join(browserDirectory, ...segments, 'index.html');
}

async function main() {
  const sitemap = await readFile(join(browserDirectory, 'sitemap.xml'), 'utf8');
  const socialImage = await readFile(join(browserDirectory, 'og-default.png'));
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert(socialImage.subarray(0, 8).equals(pngSignature), 'og-default.png no es un PNG válido.');
  assert(socialImage.readUInt32BE(16) === 1200 && socialImage.readUInt32BE(20) === 630,
    'og-default.png debe medir 1200 × 630 px.');
  const entries = [...sitemap.matchAll(/<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>\s*<\/url>/gs)]
    .map(([, location, lastModified]) => ({
      url: location,
      lastModified,
      pathname: new URL(location).pathname
    }));
  assert(entries.length > 0, 'El sitemap prerenderizado está vacío o no contiene lastmod.');

  const titles = new Set();
  const descriptions = new Set();
  for (const entry of entries) {
    const url = new URL(entry.url);
    assert(url.origin === siteOrigin, `Origen incorrecto en sitemap: ${entry.url}`);
    assert(entry.pathname === '/' || entry.pathname.endsWith('/'), `URL sin barra final: ${entry.url}`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(entry.lastModified), `lastmod inválido: ${entry.url}`);

    const html = await readFile(pageFileFromPath(entry.pathname), 'utf8');
    const document = new JSDOM(html).window.document;
    const title = document.title.trim();
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '';
    assert(title.length > 0, `Falta title en ${entry.url}`);
    assert(description.length > 0, `Falta meta description en ${entry.url}`);
    assert(!titles.has(title), `Title duplicado: ${title}`);
    assert(!descriptions.has(description), `Meta description duplicada: ${description}`);
    titles.add(title);
    descriptions.add(description);

    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    assert(canonicals.length === 1, `Se esperaba un canonical en ${entry.url}`);
    assert(canonicals[0].getAttribute('href') === entry.url, `Canonical distinto al sitemap en ${entry.url}`);
    const og = name => document.querySelector(`meta[property="og:${name}"]`)?.getAttribute('content') ?? '';
    assert(og('title') === title, `og:title no coincide en ${entry.url}`);
    assert(og('description') === description, `og:description no coincide en ${entry.url}`);
    assert(og('url') === entry.url, `og:url no coincide en ${entry.url}`);
    assert(og('type') === (entry.pathname.startsWith('/guias/') && entry.pathname !== '/guias/' ? 'article' : 'website'),
      `og:type incorrecto en ${entry.url}`);
    assert(og('locale') === 'es_ES', `og:locale incorrecto en ${entry.url}`);
    assert(og('site_name') === 'CuentaClara', `og:site_name incorrecto en ${entry.url}`);
    assert(og('image') === `${siteOrigin}/og-default.png`, `og:image incorrecta en ${entry.url}`);
    assert(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') === 'summary_large_image',
      `Falta Twitter Card en ${entry.url}`);
    assert(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') === og('image'),
      `twitter:image no coincide en ${entry.url}`);
    assert(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') === title,
      `twitter:title no coincide en ${entry.url}`);
    assert(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') === description,
      `twitter:description no coincide en ${entry.url}`);

    const jsonLdScript = document.querySelectorAll('script#seo-jsonld[type="application/ld+json"]');
    assert(jsonLdScript.length === 1, `Se esperaba JSON-LD en ${entry.url}`);
    let graph;
    try {
      graph = JSON.parse(jsonLdScript[0].textContent ?? '');
    } catch (error) {
      throw new Error(`JSON-LD inválido en ${entry.url}: ${error.message}`);
    }
    assert(graph['@context'] === 'https://schema.org', `Contexto JSON-LD incorrecto en ${entry.url}`);
    const types = graph['@graph'].map(node => node['@type']);
    assert(types.includes('Organization') && types.includes('WebSite'), `Faltan Organization/WebSite en ${entry.url}`);

    const guideArticle = entry.pathname.startsWith('/guias/') && entry.pathname !== '/guias/';
    const hasBreadcrumb = Boolean(document.querySelector('.page-breadcrumb, .guide-breadcrumb'));
    assert(types.includes('BreadcrumbList') === hasBreadcrumb, `BreadcrumbList no coincide con la página en ${entry.url}`);
    assert(types.includes('Article') === guideArticle, `Article no coincide con la ruta en ${entry.url}`);
    if (guideArticle) {
      const article = graph['@graph'].find(node => node['@type'] === 'Article');
      assert(article.datePublished && article.dateModified, `Faltan fechas Article en ${entry.url}`);
      assert(article.dateModified === entry.lastModified, `Article.dateModified no coincide con lastmod en ${entry.url}`);
      assert(!article.author || !String(article.author.name).startsWith('PENDIENTE'),
        `No debe emitirse autor pendiente en ${entry.url}`);
    }

    const visibleFaqs = getVisibleFaqs(document);
    const structuredFaqs = getStructuredFaq(graph);
    assert(JSON.stringify(structuredFaqs) === JSON.stringify(visibleFaqs),
      `FAQPage no coincide con las preguntas visibles en ${entry.url}`);
    assert(types.includes('FAQPage') === (visibleFaqs.length > 0), `FAQPage no coincide con la página en ${entry.url}`);
    assert(document.querySelector('main')?.textContent?.trim(), `Falta texto principal en ${entry.url}`);
    assert(!document.querySelector('main')?.textContent?.includes('PENDIENTE'),
      `Hay un marcador PENDIENTE visible en ${entry.url}`);

    for (const link of document.querySelectorAll('a[href^="/"]')) {
      const href = link.getAttribute('href') ?? '';
      const path = href.split(/[?#]/, 1)[0] || '/';
      assert(path === '/' || path.endsWith('/'),
        `Enlace interno sin barra final en ${entry.url}: ${href}`);
    }

    for (const image of document.querySelectorAll('img')) {
      assert(image.hasAttribute('alt'), `Imagen sin alt en ${entry.url}`);
      assert(Number(image.getAttribute('width')) > 0 && Number(image.getAttribute('height')) > 0,
        `Imagen sin dimensiones explícitas en ${entry.url}`);
    }
  }
  console.log(`Verified prerendered SEO metadata, JSON-LD, text, and images on ${entries.length} routes.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
