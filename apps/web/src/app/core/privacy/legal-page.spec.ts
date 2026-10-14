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
    ['/aviso-legal', 'Aviso legal | Cuenta Clara', 'Aviso legal'],
    ['/politica-de-privacidad', 'Política de privacidad | Cuenta Clara', 'Política de privacidad'],
    ['/politica-de-cookies', 'Política de cookies | Cuenta Clara', 'Política de cookies']
  ])('renders %s with its title and description', async (path, expectedTitle, heading) => {
    const harness = await RouterTestingHarness.create(path);
    const element = harness.routeNativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain(heading);
    expect(TestBed.inject(Title).getTitle()).toBe(expectedTitle);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBeTruthy();
    expect(element.querySelector('.legal-related a[routerLink="/politica-de-cookies"]')).not.toBeNull();
  });

  it('omits owner-identification, accommodation, and data-rights sections from the legal notices', async () => {
    const harness = await RouterTestingHarness.create('/aviso-legal');
    const legalElement = harness.routeNativeElement as HTMLElement;
    expect(legalElement.textContent).not.toMatch(/titularidad|datos personales del titular|identificación del prestador/i);

    await harness.navigateByUrl('/politica-de-privacidad');
    const privacyElement = harness.routeNativeElement as HTMLElement;
    expect(privacyElement.textContent).not.toMatch(/responsable|alojamiento|ejercer derechos/i);
  });

  it('does not expose a standalone page for services not used by the application', async () => {
    const harness = await RouterTestingHarness.create('/publicidad-y-terceros');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Decisiones claras');
  });
});
