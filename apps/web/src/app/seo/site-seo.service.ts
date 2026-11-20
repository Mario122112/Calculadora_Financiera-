import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { calculatorGuides } from '../calculator-guides';
import { GUIDE_SEO_DATA } from '../generated-guide-seo';
import type { Calculator } from '../calculator-page';

const SITE_ORIGIN = 'https://tucuentaclara.es';
const SITE_NAME = 'CuentaClara';
const SOCIAL_IMAGE = `${SITE_ORIGIN}/og-default.png`;
const SITE_DESCRIPTION =
  'Calculadoras financieras gratuitas para España: estima sueldo neto, hipoteca, préstamo personal, pensión, interés compuesto y finiquito.';
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const CALCULATOR_TITLES: Record<Calculator, string> = {
  salary: 'Calculadora de sueldo neto',
  mortgage: 'Calculadora de hipoteca',
  pension: 'Calculadora de pensión de jubilación',
  'compound-interest': 'Calculadora de interés compuesto',
  severance: 'Calculadora de finiquito e indemnización',
  'personal-loan': 'Calculadora de préstamo personal'
};

interface BreadcrumbItem {
  name: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class SiteSeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => this.updatePageMetadata());
    this.updatePageMetadata();
  }

  private updatePageMetadata(): void {
    const route = this.activeRoute();
    const slug = route.paramMap.get('slug');
    const article = slug ? GUIDE_SEO_DATA.find(guide => guide.slug === slug) : undefined;
    const calculator = this.isCalculator(route.data['calculator']) ? route.data['calculator'] : null;
    const title = article
      ? `${article.title} | ${SITE_NAME}`
      : typeof route.title === 'string' ? route.title : `${SITE_NAME} | Calculadoras financieras`;
    const description = article?.summary ??
      (typeof route.data['description'] === 'string' ? route.data['description'] : SITE_DESCRIPTION);
    const canonical = `${SITE_ORIGIN}${this.canonicalPath(this.router.url)}`;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:type', content: article ? 'article' : 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:image', content: SOCIAL_IMAGE });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'CuentaClara, calculadoras financieras para España' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:url', content: canonical });
    this.meta.updateTag({ name: 'twitter:image', content: SOCIAL_IMAGE });
    this.meta.updateTag({ name: 'twitter:image:alt', content: 'CuentaClara, calculadoras financieras para España' });
    this.updateCanonical(canonical);
    this.updateJsonLd(this.createJsonLd(canonical, description, article, calculator));
  }

  private activeRoute(): ActivatedRouteSnapshot {
    let activeRoute = this.router.routerState.snapshot.root;
    const visit = (route: ActivatedRouteSnapshot): void => {
      const config = route.routeConfig;
      if (config && (
        Object.keys(config.data ?? {}).length > 0 ||
        config.title !== undefined ||
        route.paramMap.keys.length > 0
      )) {
        activeRoute = route;
      }
      route.children.forEach(visit);
    };
    visit(activeRoute);
    return activeRoute;
  }

  private canonicalPath(routerUrl: string): string {
    const path = routerUrl.split(/[?#]/, 1)[0] || '/';
    const segments = path.split('/').filter(Boolean);
    return segments.length === 0 ? '/' : `/${segments.join('/')}/`;
  }

  private isCalculator(value: unknown): value is Calculator {
    return value === 'salary' ||
      value === 'mortgage' ||
      value === 'pension' ||
      value === 'compound-interest' ||
      value === 'severance' ||
      value === 'personal-loan';
  }

  private updateCanonical(url: string): void {
    const existing = Array.from(this.document.head.querySelectorAll('link[rel="canonical"]'));
    const canonical = existing.shift() ?? this.document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    if (!canonical.parentNode) this.document.head.appendChild(canonical);
    for (const duplicate of existing) duplicate.remove();
  }

  private createJsonLd(
    canonical: string,
    description: string,
    article: (typeof GUIDE_SEO_DATA)[number] | undefined,
    calculator: Calculator | null
  ): Record<string, unknown> {
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        description: SITE_DESCRIPTION,
        inLanguage: 'es-ES',
        publisher: { '@id': ORGANIZATION_ID }
      }
    ];
    const breadcrumbs = this.breadcrumbs(canonical, article, calculator);
    if (breadcrumbs.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      });
    }

    if (article) {
      graph.push({
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: article.title,
        description,
        datePublished: article.publishedAtIso,
        dateModified: article.updatedAtIso,
        mainEntityOfPage: { '@id': canonical },
        author: { '@type': 'Person', name: article.author },
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: 'es-ES'
      });
    }

    const faq = article?.faqs.map(item => ({ question: item.question, answer: item.answer })) ??
      (calculator ? calculatorGuides[calculator].faq.map(item => ({
        question: item.question,
        answer: item.answer
      })) : []);
    if (faq.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
      });
    }

    return { '@context': 'https://schema.org', '@graph': graph };
  }

  private breadcrumbs(
    canonical: string,
    article: (typeof GUIDE_SEO_DATA)[number] | undefined,
    calculator: Calculator | null
  ): BreadcrumbItem[] {
    if (article) {
      return [
        { name: 'Inicio', url: `${SITE_ORIGIN}/` },
        { name: 'Guías', url: `${SITE_ORIGIN}/guias/` },
        { name: article.title, url: canonical }
      ];
    }
    if (this.router.url.split(/[?#]/, 1)[0].replace(/\/+$/, '') === '/guias') {
      return [
        { name: 'Inicio', url: `${SITE_ORIGIN}/` },
        { name: 'Guías', url: canonical }
      ];
    }
    if (calculator) {
      return [
        { name: 'Inicio', url: `${SITE_ORIGIN}/` },
        { name: CALCULATOR_TITLES[calculator], url: canonical }
      ];
    }
    return [];
  }

  private updateJsonLd(jsonLd: Record<string, unknown>): void {
    const existing = Array.from(this.document.head.querySelectorAll('script#seo-jsonld'));
    const script = existing.shift() ?? this.document.createElement('script');
    script.setAttribute('id', 'seo-jsonld');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    if (!script.parentNode) this.document.head.appendChild(script);
    for (const duplicate of existing) duplicate.remove();
  }
}
