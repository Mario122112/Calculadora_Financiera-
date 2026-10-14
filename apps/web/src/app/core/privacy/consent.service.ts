import { computed, inject, Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export interface ConsentRecord {
  decision: 'accepted' | 'rejected' | 'customized';
  updatedAt: string;
  policyVersion: 2;
}

const CONSENT_STORAGE_KEY = 'cuentaclara-privacy-choice-v2';
const LEGACY_CONSENT_STORAGE_KEY = 'cuentaclara-cookie-consent-v1';

function isConsentRecord(value: unknown): value is ConsentRecord {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Partial<ConsentRecord>;
  return (record.decision === 'accepted' || record.decision === 'rejected' || record.decision === 'customized') &&
    typeof record.updatedAt === 'string' &&
    Number.isFinite(Date.parse(record.updatedAt)) &&
    record.policyVersion === 2;
}

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly storedConsent = signal<ConsentRecord | null>(null);
  readonly consent = this.storedConsent.asReadonly();
  readonly shouldShowBanner = computed(() => this.storedConsent() === null);
  readonly storageError = signal(false);

  constructor() {
    this.loadSavedConsent();
  }

  savePreferences(decision: ConsentRecord['decision']): void {
    const record: ConsentRecord = {
      decision,
      updatedAt: new Date().toISOString(),
      policyVersion: 2
    };

    this.storedConsent.set(record);
    this.storageError.set(false);

    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      this.storageError.set(true);
    }
  }

  private loadSavedConsent(): void {
    if (!this.isBrowser) {
      return;
    }

    let savedConsent: string | null;
    try {
      localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
      savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      this.storageError.set(true);
      return;
    }

    if (savedConsent === null) {
      return;
    }

    let parsedConsent: unknown;
    try {
      parsedConsent = JSON.parse(savedConsent);
    } catch {
      this.storageError.set(true);
      this.removeSavedConsent();
      return;
    }

    if (isConsentRecord(parsedConsent)) {
      this.storedConsent.set(parsedConsent);
    } else {
      this.removeSavedConsent();
    }
  }

  private removeSavedConsent(): void {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      this.storageError.set(true);
    }
  }
}
