import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CookieConsent } from './cookie-consent';
import { ConsentService } from './consent.service';

const storageKey = 'cuentaclara-privacy-choice-v2';

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.removeItem(storageKey);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.removeItem(storageKey);
  });

  async function createConsentComponent() {
    await TestBed.configureTestingModule({
      imports: [CookieConsent],
      providers: [provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(CookieConsent);
    fixture.detectChanges();
    return fixture;
  }

  function buttonByText(root: ParentNode, label: string): HTMLButtonElement {
    const button = Array.from(root.querySelectorAll('button'))
      .find(candidate => candidate.textContent?.trim() === label);
    if (!button) {
      throw new Error(`Button "${label}" was not rendered`);
    }
    return button;
  }

  it('offers balanced accept, reject, and configure actions without naming uninstalled services', async () => {
    const fixture = await createConsentComponent();
    const element = fixture.nativeElement as HTMLElement;
    const labels = Array.from(element.querySelectorAll('.consent-banner button'))
      .map(button => button.textContent?.trim());

    expect(labels).toEqual(['Aceptar', 'Rechazar', 'Configurar']);
    expect(element.textContent).toContain('no hay otras categorías opcionales configuradas');
    expect(element.textContent).not.toMatch(/AdSense|Google Analytics|publicidad/i);
    expect(Array.from(element.querySelectorAll('.consent-banner button'))
      .map(button => button.classList.contains('consent-secondary')))
      .toEqual([true, true, true]);
  });

  it('stores rejection, closes the banner, and keeps the permanent settings control', async () => {
    const fixture = await createConsentComponent();
    const element = fixture.nativeElement as HTMLElement;

    buttonByText(element, 'Rechazar').click();
    fixture.detectChanges();

    expect(TestBed.inject(ConsentService).consent()?.decision).toBe('rejected');
    expect(element.querySelector('.consent-banner')).toBeNull();
    expect(element.querySelector('.consent-reopen')?.textContent).toContain('Privacidad y cookies');
    expect(localStorage.getItem(storageKey)).not.toBeNull();
  });

  it('stores acceptance only as the user decision and allows reopening settings', async () => {
    const fixture = await createConsentComponent();
    const element = fixture.nativeElement as HTMLElement;

    buttonByText(element, 'Aceptar').click();
    fixture.detectChanges();
    expect(TestBed.inject(ConsentService).consent()?.decision).toBe('accepted');

    buttonByText(element, 'Privacidad y cookies').click();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = element.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('cookie-settings-title');
    expect(dialog?.getAttribute('aria-describedby')).toBe('cookie-settings-description');
  });

  it('moves focus into the dialog, traps keyboard navigation, and returns focus on Escape', async () => {
    const fixture = await createConsentComponent();
    const element = fixture.nativeElement as HTMLElement;

    buttonByText(element, 'Configurar').click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement?.id).toBe('cookie-settings-title');

    const dialog = element.querySelector('[role="dialog"]') as HTMLElement;
    const controls = Array.from(dialog.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(
      'button:not([disabled]), a[href]'
    ));
    const first = controls[0];
    const last = controls[controls.length - 1];

    last.focus();
    last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(document.activeElement).toBe(first);

    first.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true
    }));
    expect(document.activeElement).toBe(last);

    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('[role="dialog"]')).toBeNull();
    expect(element.querySelector('.consent-banner')).not.toBeNull();
    expect(document.activeElement).toBe(buttonByText(element, 'Configurar'));
  });
});
