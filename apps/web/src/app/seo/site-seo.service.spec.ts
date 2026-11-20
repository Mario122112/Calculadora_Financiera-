import { afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { SiteSeoService } from './site-seo.service';

interface JsonLdNode {
  '@type': string;
  mainEntity?: { name: string; acceptedAnswer: { text: string } }[];
  author?: { name?: string };
  datePublished?: string;
  dateModified?: string;
}

interface JsonLdGraph {
  '@context': string;
  '@graph': JsonLdNode[];
}

describe('SiteSeoService', () => {
  afterEach(() => {
    document.head.querySelectorAll('link[rel="canonical"], script#seo-jsonld, meta[property^="og:"], meta[name^="twitter:"]')
      .forEach(element => element.remove());
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes), SiteSeoService]
    }).compileComponents();
  });

  it('sets trailing-slash canonical, Open Graph, and FAQ/Breadcrumb JSON-LD for a calculator', async () => {
    TestBed.inject(SiteSeoService);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/calculadora-hipoteca');

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href'))
      .toBe('https://tucuentaclara.es/calculadora-hipoteca/');
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website');
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('es_ES');
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'))
      .toBe('summary_large_image');
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content'))
      .toBe('https://tucuentaclara.es/og-default.png');
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content'))
      .toBe('https://tucuentaclara.es/og-default.png');

    const graph = JSON.parse(document.querySelector('#seo-jsonld')?.textContent ?? '{}') as JsonLdGraph;
    const types = graph['@graph'].map(node => node['@type']);
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
    expect(graph['@graph'].find(node => node['@type'] === 'FAQPage')?.mainEntity?.[0]?.name)
      .toBe('¿Qué diferencia hay entre el sistema francés y el español?');
  });

  it('sets Article and matching FAQ JSON-LD with the provided author', async () => {
    TestBed.inject(SiteSeoService);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias/salario-bruto-neto');
    const page = harness.routeNativeElement as HTMLElement;

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href'))
      .toBe('https://tucuentaclara.es/guias/salario-bruto-neto/');
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
    const graph = JSON.parse(document.querySelector('#seo-jsonld')?.textContent ?? '{}') as JsonLdGraph;
    const article = graph['@graph'].find(node => node['@type'] === 'Article');
    const faq = graph['@graph'].find(node => node['@type'] === 'FAQPage');

    expect(article?.datePublished).toBe('2026-11-20');
    expect(article?.dateModified).toBe('2026-11-20');
    expect(article?.author).toEqual({ '@type': 'Person', name: 'Mario Galindo' });
    expect(faq?.mainEntity?.[0]?.name)
      .toBe(page.querySelector('.guide-faq summary')?.textContent?.trim());
    expect(faq?.mainEntity?.[0]?.acceptedAnswer.text)
      .toBe(page.querySelector('.guide-faq details p')?.textContent?.trim());
  });
});
