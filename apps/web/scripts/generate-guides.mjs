import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appDirectory = resolve(scriptDirectory, '..');
const contentDirectory = join(appDirectory, 'content', 'guias');
const generatedModulePath = join(appDirectory, 'src', 'app', 'generated-guides.ts');
const generatedSeoModulePath = join(appDirectory, 'src', 'app', 'generated-guide-seo.ts');
const routesPath = join(appDirectory, 'src', 'app', 'app.routes.ts');
const pageDatesPath = join(appDirectory, 'src', 'app', 'seo', 'page-last-modified.json');
const sitemapPath = join(appDirectory, 'public', 'sitemap.xml');
const siteOrigin = 'https://tucuentaclara.es';

function assertString(value, field, filename) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${filename}: falta el campo obligatorio "${field}".`);
  }
}

function createSlug(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatSpanishDate(isoDate, field, filename) {
  if (typeof isoDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`${filename}: "${field}" debe tener formato AAAA-MM-DD.`);
  }
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== isoDate) {
    throw new Error(`${filename}: "${field}" no es una fecha válida.`);
  }
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}

function wordCount(markdown, faqs) {
  const visibleBody = markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#|~]/g, ' ');
  const faqText = faqs.flatMap(({ question, answer }) => [question, answer]).join(' ');
  return `${visibleBody} ${faqText}`.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function validateList(value, fields, fieldName, filename) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${filename}: "${fieldName}" debe contener al menos un elemento.`);
  }
  for (const [index, item] of value.entries()) {
    for (const field of fields) {
      assertString(item?.[field], `${fieldName}[${index}].${field}`, filename);
    }
  }
}

function getRouteObjects(source) {
  const routesStart = source.indexOf('export const routes');
  const arrayStart = source.indexOf('[', routesStart);
  if (routesStart < 0 || arrayStart < 0) {
    throw new Error('No se pudo localizar el array exportado "routes" en app.routes.ts.');
  }

  const objects = [];
  let objectStart = -1;
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = arrayStart + 1; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }
    if (character === "'" || character === '"' || character === '`') {
      quote = character;
    } else if (character === '{') {
      if (depth === 0) objectStart = index;
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0 && objectStart >= 0) {
        objects.push(source.slice(objectStart, index + 1));
        objectStart = -1;
      }
    } else if (character === ']' && depth === 0) {
      break;
    }
  }
  return objects;
}

async function main() {
  const filenames = (await readdir(contentDirectory))
    .filter(filename => filename.endsWith('.md'))
    .sort();
  const articles = [];

  for (const filename of filenames) {
    const filePath = join(contentDirectory, filename);
    const source = await readFile(filePath, 'utf8');
    const { data, content } = matter(source);
    const slug = basename(filename, '.md');

    for (const field of ['slug', 'title', 'summary', 'author', 'publishedAt', 'updatedAt']) {
      assertString(data[field], field, filename);
    }
    if (data.slug !== slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
      throw new Error(`${filename}: el slug debe coincidir con el nombre del archivo.`);
    }
    validateList(data.relatedCalculators, ['label', 'url'], 'relatedCalculators', filename);
    validateList(data.sources, ['label', 'url'], 'sources', filename);
    validateList(data.faqs, ['question', 'answer'], 'faqs', filename);
    if (data.relatedCalculators.some(item => !item.url.startsWith('/') || (item.url !== '/' && !item.url.endsWith('/')))) {
      throw new Error(`${filename}: los enlaces a calculadoras deben usar rutas internas con barra final.`);
    }
    if (data.sources.some(item => !item.url.startsWith('https://'))) {
      throw new Error(`${filename}: las fuentes deben usar enlaces HTTPS.`);
    }
    if (data.order !== undefined && (!Number.isInteger(data.order) || data.order < 0)) {
      throw new Error(`${filename}: "order" debe ser un entero no negativo.`);
    }
    if (/<\/?[a-z][^>]*>/i.test(content)) {
      throw new Error(`${filename}: no se permite HTML en el cuerpo Markdown.`);
    }
    const markdownLinks = [...content.matchAll(/\]\(([^)]+)\)/g)].map(([, url]) => url);
    if (markdownLinks.some(url =>
      (!url.startsWith('/') && !url.startsWith('https://')) ||
      (url.startsWith('/') && url !== '/' && !url.endsWith('/'))
    )) {
      throw new Error(`${filename}: los enlaces internos Markdown deben tener barra final.`);
    }

    const words = wordCount(content, data.faqs);
    if (words < 1200 || words > 1500) {
      throw new Error(`${filename}: el artículo tiene ${words} palabras; el rango es 1.200-1.500.`);
    }

    const headingMatches = [...content.matchAll(/^##\s+(.+)$/gm)];
    const leadMarkdown = content.slice(0, headingMatches[0]?.index ?? content.length).trim();
    const sections = await Promise.all(headingMatches.map(async (heading, index) => {
      const start = heading.index + heading[0].length;
      const end = headingMatches[index + 1]?.index ?? content.length;
      const title = heading[1].trim();
      return {
        id: createSlug(title),
        title,
        html: await marked.parse(content.slice(start, end).trim())
      };
    }));

    articles.push({
      slug,
      title: data.title,
      summary: data.summary,
      author: data.author,
      publishedAt: formatSpanishDate(data.publishedAt, 'publishedAt', filename),
      updatedAt: formatSpanishDate(data.updatedAt, 'updatedAt', filename),
      publishedAtIso: data.publishedAt,
      updatedAtIso: data.updatedAt,
      editorialOrder: Number.isInteger(data.order) ? data.order : Number.MAX_SAFE_INTEGER,
      wordCount: words,
      leadHtml: await marked.parse(leadMarkdown),
      sections,
      headings: sections.map(({ id, title }) => ({ id, title })),
      faqs: data.faqs,
      relatedCalculators: data.relatedCalculators,
      sources: data.sources
    });
  }

  articles.sort((first, second) =>
    second.publishedAtIso.localeCompare(first.publishedAtIso) ||
    first.editorialOrder - second.editorialOrder ||
    first.slug.localeCompare(second.slug)
  );
  const generatedArticles = articles.map(({ editorialOrder, wordCount: _wordCount, ...article }) => article);
  const generatedModule = [
    'export interface GuideArticle {',
    '  slug: string;',
    '  title: string;',
    '  summary: string;',
    '  author: string;',
    '  publishedAt: string;',
    '  updatedAt: string;',
    '  publishedAtIso: string;',
    '  updatedAtIso: string;',
    '  leadHtml: string;',
    '  sections: { id: string; title: string; html: string }[];',
    '  headings: { id: string; title: string }[];',
    '  faqs: { question: string; answer: string }[];',
    '  relatedCalculators: { label: string; url: string }[];',
    '  sources: { label: string; url: string }[];',
    '}',
    '',
    `export const GUIDE_ARTICLES: readonly GuideArticle[] = ${JSON.stringify(generatedArticles, null, 2)};`,
    ''
  ].join('\n');
  await writeFile(generatedModulePath, generatedModule);

  const seoArticles = generatedArticles.map(({
    slug,
    title,
    summary,
    author,
    updatedAt,
    publishedAtIso,
    updatedAtIso,
    faqs
  }) => ({
    slug,
    title,
    summary,
    author,
    updatedAt,
    publishedAtIso,
    updatedAtIso,
    faqs
  }));
  const generatedSeoModule = [
    'export interface GuideSeoData {',
    '  slug: string;',
    '  title: string;',
    '  summary: string;',
    '  author: string;',
    '  updatedAt: string;',
    '  publishedAtIso: string;',
    '  updatedAtIso: string;',
    '  faqs: { question: string; answer: string }[];',
    '}',
    '',
    `export const GUIDE_SEO_DATA: readonly GuideSeoData[] = ${JSON.stringify(seoArticles, null, 2)};`,
    ''
  ].join('\n');
  await writeFile(generatedSeoModulePath, generatedSeoModule);

  const routeSource = await readFile(routesPath, 'utf8');
  const pageDates = JSON.parse(await readFile(pageDatesPath, 'utf8'));
  const routeObjects = getRouteObjects(routeSource);
  const routeEntries = routeObjects.flatMap(routeObject => {
    const path = routeObject.match(/\bpath:\s*['"]([^'"]*)['"]/)?.[1];
    if (path === undefined || path === '**' || path.includes(':')) return [];
    const isCalculator = /\bcalculator:\s*['"]/.test(routeObject);
    let lastModified = isCalculator
      ? pageDates.calculatorLastModified
      : pageDates.pageLastModified[path];
    if (path === 'guias' && articles.length > 0) {
      lastModified = articles.reduce(
        (latest, article) => article.updatedAtIso > latest ? article.updatedAtIso : latest,
        articles[0].updatedAtIso
      );
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastModified ?? '')) {
      throw new Error(`Falta una fecha lastmod válida para la ruta "${path}".`);
    }
    const urlPath = path === '' ? '/' : `/${path}/`;
    return [{ path: urlPath, lastModified }];
  });
  const staticPaths = routeObjects
    .map(routeObject => routeObject.match(/\bpath:\s*['"]([^'"]*)['"]/)?.[1])
    .filter(path => path !== undefined && path !== '**' && !path.includes(':'));
  for (const [path, date] of Object.entries(pageDates.pageLastModified)) {
    if (!staticPaths.includes(path)) {
      throw new Error(`La fecha configurada para la ruta inexistente "${path}" debe eliminarse.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`La fecha lastmod de "${path}" debe tener formato AAAA-MM-DD.`);
    }
  }
  const urls = [
    ...routeEntries,
    ...articles.map(article => ({
      path: `/guias/${article.slug}/`,
      lastModified: article.updatedAtIso
    }))
  ];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ path, lastModified }) =>
      `    <url><loc>${siteOrigin}${path}</loc><lastmod>${lastModified}</lastmod></url>`
    ),
    '</urlset>',
    ''
  ].join('\n');
  await writeFile(sitemapPath, sitemap);
  console.log(`Generated ${articles.length} guides (${articles.map(article => `${article.slug}: ${article.wordCount} words`).join(', ')}) and updated sitemap.xml.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
