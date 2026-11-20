import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';

describe('Legal pages', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    });
  });

  it.each([
    ['/aviso-legal', 'Aviso legal | CuentaClara', 'Aviso legal'],
    ['/politica-de-privacidad', 'Política de privacidad | CuentaClara', 'Política de privacidad'],
    ['/sobre-nosotros', 'Sobre nosotros | CuentaClara', 'Sobre nosotros']
  ])('renders %s with its title and description', async (path, expectedTitle, heading) => {
    const harness = await RouterTestingHarness.create(path);
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain(heading);
    expect(TestBed.inject(Title).getTitle()).toBe(expectedTitle);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBeTruthy();
  });

  it('shows the provided legal identity, leaves undisclosed details pending, and discloses advertising', async () => {
    const harness = await RouterTestingHarness.create('/aviso-legal');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.textContent).toContain('Titular del sitio: Mario Galindo.');
    expect(element.textContent).toContain('Ubicación: Murcia, España.');
    expect(element.textContent).not.toContain('domicilio postal');
    expect(element.textContent).not.toContain('NIF/NIE');
    expect(element.textContent).toContain('Google AdSense');
  });

  it('describes third-party data processing and remaining verification in the privacy policy', async () => {
    const harness = await RouterTestingHarness.create('/politica-de-privacidad');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.textContent).toContain('Formspree');
    expect(element.textContent).toContain('Google AdSense');
    expect(element.textContent).not.toContain('PENDIENTE');
    expect(element.textContent).toContain('cookies o tecnologías similares');
    expect(element.textContent).toContain('según la configuración del servicio, personalizar la publicidad.');
  });

  it('shows only the provided personal details on the about page', async () => {
    const harness = await RouterTestingHarness.create('/sobre-nosotros');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.textContent).toContain('Mario Galindo');
    expect(element.textContent).toContain('Murcia, España');
    expect(element.textContent).toContain('cuentaclaracalc@gmail.com');
    expect(element.textContent).not.toContain('PENDIENTE');
    expect(element.querySelector('a[href="/como-se-calcula/"]')).not.toBeNull();
  });
});
