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
    expect(element.querySelectorAll('.guide-card')).toHaveLength(6);
    expect(element.querySelector('a[href="/guias/salario-bruto-neto/"]')).not.toBeNull();
    expect(element.querySelector('a[href="/guias/retencion-irpf-nomina-renta/"]')).not.toBeNull();
    expect(element.querySelector('a[href="/guias/tin-tae-comisiones-prestamo-personal/"]')).not.toBeNull();
    expect(element.querySelector('a[href="/guias/12-o-14-pagas-que-cambia-en-tu-sueldo/"]')).not.toBeNull();
    expect(element.querySelector('a[href="/guias/que-incluye-un-finiquito-y-que-no/"]')).not.toBeNull();
    expect(element.querySelector('a[href="/guias/hipoteca-sistema-frances-amortizacion-constante/"]')).not.toBeNull();
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

  it('renders the loan comparison, four FAQs, and official sources', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias/tin-tae-comisiones-prestamo-personal');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('TIN, comisiones y TAE');
    expect(element.querySelector('.guide-byline')?.textContent).toContain('Mario Galindo');
    expect(element.querySelector('.guide-body table')?.textContent).toContain('2.374,00 €');
    expect(element.querySelectorAll('.guide-faq details')).toHaveLength(4);
    expect(element.querySelector('.guide-links a[href="/calculadora-prestamo-personal/"]')).not.toBeNull();
    expect(element.querySelector('.guide-sources a[href="https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html"]')).not.toBeNull();
  });

  it('renders the 12- and 14-payment comparison with four FAQs', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias/12-o-14-pagas-que-cambia-en-tu-sueldo');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('12 o 14 pagas');
    expect(element.querySelector('.guide-byline')?.textContent).toContain('Mario Galindo');
    const table = element.querySelector('.guide-body table');
    expect(table?.querySelectorAll('tbody tr')).toHaveLength(12);
    expect(table?.textContent).toContain('1.651,71 €');
    expect(table?.textContent).toContain('3.303,43 €');
    expect(table?.textContent).toContain('23.124,00 €');
    expect(element.querySelectorAll('.guide-faq details')).toHaveLength(4);
    expect(element.querySelector('.guide-links a[href="/sueldo-neto/"]')).not.toBeNull();
    expect(element.querySelector('.guide-sources a[href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a31"]')).not.toBeNull();
  });

  it('renders the finiquito breakdown, FAQs, calculator, and official sources', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias/que-incluye-un-finiquito-y-que-no');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Qué incluye un finiquito');
    expect(element.querySelector('.guide-byline')?.textContent).toContain('23 de noviembre de 2026');
    const tables = element.querySelectorAll('.guide-body table');
    expect(tables[0]?.textContent?.replace(/\s+/g, ' ')).toContain('Pagas extra pendientes 0 €');
    expect(tables[1]?.textContent).toContain('3.123,29 €');
    expect(tables[2]?.textContent).toContain('7.260,27 €');
    expect(tables[2]?.textContent).toContain('10.383,56 €');
    expect(element.querySelector('.guide-body')?.textContent).toContain('30 × 9 ÷ 12 = 22,5 días generados');
    expect(element.querySelector('.guide-body')?.textContent).toContain('12 pagas con las extras prorrateadas');
    expect(element.querySelectorAll('.guide-faq details')).toHaveLength(4);
    expect(element.querySelector('.guide-links a[href="/calculadora-finiquito-indemnizacion/"]')).not.toBeNull();
    expect(element.querySelector('.guide-sources a[href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a38"]')).not.toBeNull();
    expect(element.querySelector('.guide-sources a[href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a53"]')).not.toBeNull();
    expect(element.querySelector('.guide-sources a[href^="https://www.sepe.es/"]')).not.toBeNull();
  });

  it('renders the mortgage-system comparison and balance checkpoints', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/guias/hipoteca-sistema-frances-amortizacion-constante');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Hipoteca: sistema francés');
    expect(element.querySelector('.guide-byline')?.textContent).toContain('23 de noviembre de 2026');
    const tables = element.querySelectorAll('.guide-body table');
    expect(tables[0]?.textContent).toContain('300.374,14 €');
    expect(tables[0]?.textContent).toContain('287.791,67 €');
    expect(tables[1]?.querySelectorAll('tbody tr')).toHaveLength(3);
    expect(tables[1]?.textContent).toContain('101.252,80 €');
    expect(tables[1]?.textContent).toContain('80.000,00 €');
    expect(element.querySelectorAll('.guide-faq details')).toHaveLength(4);
    expect(element.querySelector('.guide-links a[href="/calculadora-hipoteca/"]')).not.toBeNull();
    expect(element.querySelector('.guide-sources a[href$="Cuota_hipotecaria.html"]')).not.toBeNull();
    expect(element.querySelector('.guide-body')?.textContent).toContain('mes 129');
    expect(element.querySelector('.guide-body')?.textContent).toContain('12.582,48 € menos de intereses');
    expect(element.querySelector('.guide-body')?.textContent).toContain('417,91 €');
    expect(element.querySelector('.guide-body')?.textContent).toContain('666,67 €');
  });
});
