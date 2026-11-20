import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { GUIDE_ARTICLES } from './generated-guides';
import { CanonicalLink } from './seo/canonical-link.directive';

@Component({
  selector: 'app-guide-pages',
  imports: [CanonicalLink, NgOptimizedImage],
  template: `
    <div class="guide-shell">
      <header class="topbar">
        <a class="brand" canonicalLink="/" aria-label="CuentaClara, inicio">
          <span class="brand-mark" aria-hidden="true"><img ngSrc="/euro.png" alt="" width="20" height="20" /></span>
          <span>CuentaClara</span>
        </a>
        <nav class="topbar-nav" aria-label="Navegación">
          <a canonicalLink="/sueldo-neto/">Sueldo neto</a>
          <a canonicalLink="/calculadora-hipoteca/">Hipoteca</a>
          <a canonicalLink="/calculadora-pension/">Pensión</a>
          <a canonicalLink="/calculadora-interes-compuesto/">Interés compuesto</a>
          <a canonicalLink="/calculadora-finiquito-indemnizacion/">Finiquito</a>
          <a canonicalLink="/calculadora-prestamo-personal/">Préstamo personal</a>
          <a canonicalLink="/guias/" [attr.aria-current]="isArticleRoute() ? null : 'page'">Guías</a>
        </nav>
        <div class="topbar-meta">
          <span class="status-dot" aria-hidden="true"></span>
          <span>Calculadoras para España</span>
        </div>
      </header>

      <main class="guide-page">
      <nav class="guide-breadcrumb" aria-label="Migas de pan">
        <a canonicalLink="/">Inicio</a>
        <span aria-hidden="true">/</span>
        @if (article(); as currentArticle) {
          <a canonicalLink="/guias/">Guías</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ currentArticle.title }}</span>
        } @else {
          <span aria-current="page">Guías</span>
        }
      </nav>

      @if (article(); as currentArticle) {
        <article class="guide-article">
          <header class="guide-header">
            <p class="guide-eyebrow">GUÍA PRÁCTICA</p>
            <h1>{{ currentArticle.title }}</h1>
            <p class="guide-summary">{{ currentArticle.summary }}</p>
            <dl class="guide-byline">
              <div><dt>Autoría</dt><dd>{{ currentArticle.author }}</dd></div>
              <div><dt>Publicado</dt><dd>{{ currentArticle.publishedAt }}</dd></div>
              <div><dt>Actualizado</dt><dd>{{ currentArticle.updatedAt }}</dd></div>
            </dl>
          </header>

          <nav class="guide-toc" aria-labelledby="guide-toc-title">
            <h2 id="guide-toc-title">En esta guía</h2>
            <ol>
              @for (heading of currentArticle.headings; track heading.id) {
                <li><a [href]="'/guias/' + currentArticle.slug + '/#' + heading.id">{{ heading.title }}</a></li>
              }
            </ol>
          </nav>

          <div class="guide-body">
            <div [innerHTML]="currentArticle.leadHtml"></div>
            @for (section of currentArticle.sections; track section.id) {
              <section [id]="section.id">
                <h2>{{ section.title }}</h2>
                <div [innerHTML]="section.html"></div>
              </section>
            }
          </div>

          <section class="guide-faq" aria-labelledby="guide-faq-title">
            <h2 id="guide-faq-title">Preguntas frecuentes</h2>
            @for (faq of currentArticle.faqs; track faq.question) {
              <details>
                <summary>{{ faq.question }}</summary>
                <p>{{ faq.answer }}</p>
              </details>
            }
          </section>

          <section class="guide-links" aria-labelledby="guide-calculators-title">
            <h2 id="guide-calculators-title">Calculadoras relacionadas</h2>
            <ul>
              @for (calculator of currentArticle.relatedCalculators; track calculator.url) {
                <li><a [canonicalLink]="calculator.url">{{ calculator.label }}</a></li>
              }
            </ul>
          </section>

          <section class="guide-sources" aria-labelledby="guide-sources-title">
            <h2 id="guide-sources-title">Fuentes oficiales</h2>
            <ul>
              @for (source of currentArticle.sources; track source.url) {
                <li><a [href]="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a></li>
              }
            </ul>
          </section>
        </article>
      } @else if (isArticleRoute()) {
        <section class="guide-not-found">
          <p class="guide-eyebrow">GUÍAS</p>
          <h1>No encontramos ese artículo</h1>
          <p>Puede que la dirección haya cambiado o que el artículo ya no esté disponible.</p>
          <a canonicalLink="/guias/">Ver todas las guías</a>
        </section>
      } @else {
        <section class="guide-index" aria-labelledby="guide-index-title">
          <p class="guide-eyebrow">BIBLIOTECA EDITORIAL</p>
          <h1 id="guide-index-title">Guías de finanzas personales</h1>
          <p class="guide-summary">Explicaciones prácticas para entender cálculos habituales y contrastarlos con fuentes oficiales.</p>
          <div class="guide-list">
            @for (guide of guides; track guide.slug) {
              <article class="guide-card">
                <p class="guide-card-date">Actualizado {{ guide.updatedAt }}</p>
                <h2><a [canonicalLink]="'/guias/' + guide.slug + '/'">{{ guide.title }}</a></h2>
                <p>{{ guide.summary }}</p>
                <a class="guide-card-link" [canonicalLink]="'/guias/' + guide.slug + '/'">Leer la guía <span aria-hidden="true">→</span></a>
              </article>
            }
          </div>
        </section>
      }
      </main>

      <footer class="guide-footer">
        <a class="guide-brand" canonicalLink="/">CuentaClara</a>
        <nav aria-label="Información">
          <a canonicalLink="/como-se-calcula/">Cómo se calcula</a>
          <a canonicalLink="/sobre-nosotros/">Sobre nosotros</a>
          <a canonicalLink="/aviso-legal/">Aviso legal</a>
          <a canonicalLink="/politica-de-privacidad/">Privacidad</a>
          <a canonicalLink="/contacto/">Contacto</a>
        </nav>
      </footer>
    </div>
  `,
  styleUrl: './guide-pages.scss'
})
export class GuidePages {
  readonly guides = GUIDE_ARTICLES;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly slug = signal<string | null>(null);
  readonly article = computed(() => GUIDE_ARTICLES.find(guide => guide.slug === this.slug()) ?? null);
  readonly isArticleRoute = computed(() => this.slug() !== null);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      this.slug.set(params.get('slug'));
      this.updatePageMetadata();
    });
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => this.updatePageMetadata());
  }

  private updatePageMetadata(): void {
    const article = this.article();
    this.title.setTitle(article ? `${article.title} | CuentaClara` : 'Guías de finanzas personales | CuentaClara');
    this.meta.updateTag({
      name: 'description',
      content: article?.summary ?? 'Guías prácticas sobre salario, impuestos y decisiones financieras en España.'
    });
  }
}
