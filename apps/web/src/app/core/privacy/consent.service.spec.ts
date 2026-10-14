import { TestBed } from '@angular/core/testing';
import { ConsentService } from './consent.service';

const storageKey = 'cuentaclara-privacy-choice-v2';
const legacyStorageKey = 'cuentaclara-cookie-consent-v1';

describe('ConsentService', () => {
  beforeEach(() => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(legacyStorageKey);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.removeItem(storageKey);
    localStorage.removeItem(legacyStorageKey);
  });

  it('shows the banner until a valid choice is saved', () => {
    const consent = TestBed.inject(ConsentService);

    expect(consent.shouldShowBanner()).toBe(true);
    expect(consent.consent()).toBeNull();
  });

  it('persists only the selected decision, its date, and the record version', () => {
    const consent = TestBed.inject(ConsentService);
    consent.savePreferences('rejected');

    const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    expect(saved).toMatchObject({
      decision: 'rejected',
      policyVersion: 2
    });
    expect(Number.isNaN(Date.parse(saved.updatedAt))).toBe(false);
    expect(Object.keys(saved).sort()).toEqual(['decision', 'policyVersion', 'updatedAt']);
    expect(consent.shouldShowBanner()).toBe(false);
  });

  it('removes a malformed record, reports the storage error, and asks again', () => {
    localStorage.setItem(storageKey, '{invalid');
    const consent = TestBed.inject(ConsentService);

    expect(consent.shouldShowBanner()).toBe(true);
    expect(consent.storageError()).toBe(true);
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it('keeps the application usable in memory when the browser refuses storage', () => {
    const consent = TestBed.inject(ConsentService);
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage disabled', 'SecurityError');
    };

    try {
      consent.savePreferences('accepted');
      expect(consent.consent()?.decision).toBe('accepted');
      expect(consent.shouldShowBanner()).toBe(false);
      expect(consent.storageError()).toBe(true);
    } finally {
      Storage.prototype.setItem = originalSetItem;
    }
  });

  it('removes the old record format instead of retaining its unused categories', () => {
    localStorage.setItem(legacyStorageKey, JSON.stringify({
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true,
      decision: 'accepted',
      updatedAt: new Date().toISOString(),
      policyVersion: 1
    }));
    const consent = TestBed.inject(ConsentService);

    expect(localStorage.getItem(legacyStorageKey)).toBeNull();
    expect(consent.shouldShowBanner()).toBe(true);
  });
});
