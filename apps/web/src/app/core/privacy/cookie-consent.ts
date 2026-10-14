import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentRecord, ConsentService } from './consent.service';

@Component({
  selector: 'app-cookie-consent',
  imports: [RouterLink],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss'
})
export class CookieConsent {
  protected readonly consent = inject(ConsentService);
  protected readonly panel = signal<'banner' | 'settings' | null>(null);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private panelBeforeSettings: 'banner' | null = null;

  constructor() {
    if (this.consent.shouldShowBanner()) {
      this.panel.set('banner');
    }
  }

  protected rejectOptional(): void {
    this.save('rejected');
  }

  protected accept(): void {
    this.save('accepted');
  }

  protected saveSettings(): void {
    this.save('customized');
  }

  protected openSettings(): void {
    this.panelBeforeSettings = this.panel() === 'banner' ? 'banner' : null;
    this.panel.set('settings');
    this.focusAfterRender('#cookie-settings-title');
  }

  protected cancelSettings(): void {
    this.panel.set(this.panelBeforeSettings);
    this.focusAfterRender(this.panelBeforeSettings
      ? '.consent-configure'
      : '.consent-reopen');
  }

  protected handleDialogKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelSettings();
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }

    const dialog = event.currentTarget as HTMLElement;
    const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(element => !element.hidden);
    if (focusableElements.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const active = dialog.ownerDocument.activeElement;
    const activeIsFocusable = focusableElements.includes(active as HTMLElement);
    if (event.shiftKey && (active === first || !activeIsFocusable)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || active === dialog)) {
      event.preventDefault();
      first.focus();
    }
  }

  private save(decision: ConsentRecord['decision']): void {
    this.consent.savePreferences(decision);
    this.panel.set(null);
    this.focusAfterRender('.consent-reopen');
  }

  private focusAfterRender(selector: string): void {
    if (!this.isBrowser) {
      return;
    }
    afterNextRender(() => {
      const target = this.element.nativeElement.querySelector(selector) as HTMLElement | null;
      target?.focus();
    }, { injector: this.injector });
  }
}
