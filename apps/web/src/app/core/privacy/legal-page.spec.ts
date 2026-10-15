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
    ['/politica-de-cookies', 'Política de cookies | CuentaClara', 'Política de cookies']
  ])('renders %s with its title and description', async (path, expectedTitle, heading) => {
    const harness = await RouterTestingHarness.create(path);
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain(heading);
    expect(TestBed.inject(Title).getTitle()).toBe(expectedTitle);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBeTruthy();
    expect(element.querySelector('.legal-related a[routerLink="/politica-de-cookies"]')).not.toBeNull();
  });

  it('explains possible identification requirements and the incomplete address', async () => {
    const harness = await RouterTestingHarness.create('/aviso-legal');
    const legalElement = harness.routeNativeElement as HTMLElement;
    expect(legalElement.textContent).toContain('Ley 34/2002 (LSSI-CE), artículo 10');
    expect(legalElement.textContent).toContain('Murcia) no es una dirección postal completa');
    expect(legalElement.textContent).toContain('dirección profesional');

    await harness.navigateByUrl('/politica-de-privacidad');
    const privacyElement = harness.routeNativeElement as HTMLElement;
    expect(privacyElement.textContent).toContain('servicio de alojamiento');
    expect(privacyElement.textContent).toContain('cuenta de Gmail de Google');
    expect(privacyElement.textContent).toContain('plazos de conservación');
  });

  it('shows the authorized public contact details and a user-controlled mailto link', async () => {
    const harness = await RouterTestingHarness.create('/contacto');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.textContent).toContain('Mario Galindo');
    expect(element.textContent).toContain('Murcia, España');
    expect(element.querySelector('a[href="mailto:cuentaclaracalc@gmail.com"]')?.textContent)
      .toBe('cuentaclaracalc@gmail.com');
    expect(element.querySelector('form')).toBeNull();
    expect(element.textContent).toContain('solo se transmite si lo revisas y pulsas Enviar');
  });

  it('explains that the current site does not use cookies or browser storage', async () => {
    const harness = await RouterTestingHarness.create('/politica-de-cookies');
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.textContent).toContain('no instala cookies ni usa almacenamiento local');
    expect(element.textContent).not.toContain('Configurar');
    expect(element.textContent).not.toContain('cuentaclara-privacy-choice-v2');
  });

  it('does not expose a standalone page for services not used by the application', async () => {
    const harness = await RouterTestingHarness.create('/publicidad-y-terceros');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Decisiones claras');
  });
});
