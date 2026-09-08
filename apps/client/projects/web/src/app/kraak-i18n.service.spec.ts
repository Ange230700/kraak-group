import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { KRAAK_TRANSLATION_CATALOGS } from '../../../shared/i18n/kraak-i18n.catalogs';
import { provideKraakI18n } from '../../../shared/i18n/kraak-i18n.providers';
import { KraakI18nService } from '../../../shared/i18n/kraak-i18n.service';

describe('KraakI18nService', () => {
  beforeEach(async () => {
    globalThis.window.localStorage.setItem('kraak:locale', 'fr-CI');

    await TestBed.configureTestingModule({
      providers: [
        provideKraakI18n(),
        {
          provide: KRAAK_TRANSLATION_CATALOGS,
          useValue: {
            'fr-CI': {
              test: {
                locale: 'fr',
              },
            },
            'en-GB': {
              test: {
                locale: 'en',
              },
            },
          },
        },
      ],
    }).compileComponents();

    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('Given a locale is selected again while its earlier selection is pending, When competing selections overlap, Then the latest repeated locale wins', async () => {
    const i18n = TestBed.inject(KraakI18nService);

    const firstEnglishSelection = i18n.setLocale('en-GB');
    const frenchSelection = i18n.setLocale('fr-CI');
    const latestEnglishSelection = i18n.setLocale('en-GB');

    await Promise.all([
      firstEnglishSelection,
      frenchSelection,
      latestEnglishSelection,
    ]);

    expect(i18n.locale()).toBe('en-GB');
    expect(i18n.translate('test.locale')).toBe('en');
  });

  it('Given overlapping locale changes, When an older catalogue load resolves after the latest selection, Then the latest locale remains active', async () => {
    const i18n = TestBed.inject(KraakI18nService);

    expect(i18n.locale()).toBe('fr-CI');

    const olderSelection = i18n.setLocale('en-GB');
    const latestSelection = i18n.setLocale('fr-CI');

    await Promise.all([olderSelection, latestSelection]);

    expect(i18n.locale()).toBe('fr-CI');
    expect(i18n.translate('test.locale')).toBe('fr');
  });
});
