import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { routes } from './app.routes';

describe('GuidePages', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('lists the Markdown guides and links to their prerendered article routes', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('.topbar .brand-mark img')).not.toBeNull();
    expect(element.querySelector('.topbar .topbar-meta')?.textContent).toContain('Calculadoras para España');
    expect(element.querySelectorAll('.topbar .topbar-nav a')).toHaveLength(7);
    expect(element.querySelector('h1')?.textContent).toContain('Guías de finanzas personales');
    expect(element.querySelectorAll('.guide-card')).toHaveLength(2);
    expect(element.querySelector('a[href="/guias/salario-bruto-neto/"]')).not.toBeNull();
    expect(element.querySelector('a[href="/guias/retencion-irpf-nomina-renta/"]')).not.toBeNull();
  });

  it('renders article metadata, contents, FAQs, calculators, and official sources', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias/salario-bruto-neto');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Salario bruto y salario neto');
    expect(element.querySelector('.guide-byline')?.textContent).toContain('Mario Galindo');
    expect(element.querySelectorAll('.guide-toc a').length).toBeGreaterThan(1);
    expect(element.querySelector('.guide-toc a')?.getAttribute('href'))
      .toBe(`/guias/salario-bruto-neto/#${element.querySelector('.guide-body section')?.id}`);
    expect(element.querySelectorAll('.guide-faq details')).toHaveLength(3);
    expect(element.querySelector('.guide-links a[href="/sueldo-neto/"]')).not.toBeNull();
    expect(element.querySelector('.guide-sources a[href^="https://"]')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toContain('Salario bruto y salario neto');
    expect(TestBed.inject(Meta).getTag('name=description')?.content).toContain('Aprende a leer');
  });

  it('shows a useful message for an unknown article slug', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias/no-existe');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('No encontramos ese artículo');
    expect(element.querySelector('a[href="/guias/"]')).not.toBeNull();
  });
});
