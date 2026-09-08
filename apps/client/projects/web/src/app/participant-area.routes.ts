// apps\client\projects\web\src\app\participant-area.routes.ts

import { inject } from '@angular/core';
import { type CanMatchFn, type ResolveFn, Routes } from '@angular/router';
import { resolveSupportedLocale } from '@kraak/domain';

import {
  participantRoleGuard,
  participantRoleChildGuard,
} from './core/auth/auth.guard';
import { isParticipantAreaEnabled } from './core/runtime/runtime-config';
import { KraakI18nService } from '../../../shared/i18n';
import { type SeoPageDefinition } from './seo/site-seo';

export const participantAreaCanMatch: CanMatchFn = () =>
  isParticipantAreaEnabled();

const AUTH_ROBOTS_DIRECTIVE = 'noindex, nofollow';
const PARTICIPANT_SHARE_IMAGE =
  '/assets/site-visuals/photos/home-hero-workshop.jpg';

interface ParticipantSeoOptions {
  readonly path: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

const translatedTitle =
  (key: string): ResolveFn<string> =>
  () => {
    const i18n = inject(KraakI18nService);
    return `${i18n.translate(key)} | KRAAK`;
  };

const participantSeo =
  ({
    path,
    titleKey,
    descriptionKey,
  }: ParticipantSeoOptions): ResolveFn<SeoPageDefinition> =>
  () => {
    const i18n = inject(KraakI18nService);
    const locale = resolveSupportedLocale(i18n.locale());
    const title = `${i18n.translate(titleKey)} | KRAAK`;
    const description = i18n.translate(descriptionKey);

    return {
      path,
      title,
      description,
      robots: AUTH_ROBOTS_DIRECTIVE,
      locale,
      htmlLang: locale,
      openGraphLocale: locale.replace('-', '_'),
      openGraph: {
        title,
        description,
        imagePath: PARTICIPANT_SHARE_IMAGE,
        imageAlt: `${i18n.translate(
          'web.auth.common.participantArea',
        )} | KRAAK Consulting`,
      },
      sitemap: {
        changeFrequency: 'never',
        priority: 0.1,
      },
    };
  };

export const participantAreaRoutes: Routes = [
  {
    path: 'connexion',
    title: translatedTitle('web.auth.signIn.title'),
    resolve: {
      seo: participantSeo({
        path: 'connexion',
        titleKey: 'web.auth.signIn.title',
        descriptionKey: 'web.auth.signIn.subtitle',
      }),
    },
    loadComponent: () => import('./features/auth/sign-in.page'),
  },
  {
    path: 'inscription',
    title: translatedTitle('web.auth.signUp.title'),
    resolve: {
      seo: participantSeo({
        path: 'inscription',
        titleKey: 'web.auth.signUp.title',
        descriptionKey: 'web.auth.signUp.subtitle',
      }),
    },
    loadComponent: () => import('./features/auth/sign-up.page'),
  },
  {
    path: 'mot-de-passe-oublie',
    title: translatedTitle('web.auth.signIn.forgotPassword'),
    resolve: {
      seo: participantSeo({
        path: 'mot-de-passe-oublie',
        titleKey: 'web.auth.signIn.forgotPassword',
        descriptionKey: 'web.auth.forgotPassword.subtitle',
      }),
    },
    loadComponent: () => import('./features/auth/password-reset.page'),
  },
  {
    path: 'participant',
    data: {
      appShell: 'participant',
    },
    resolve: {
      seo: participantSeo({
        path: 'participant/dashboard',
        titleKey: 'web.auth.common.participantArea',
        descriptionKey: 'web.participant.dashboard.hero.intro',
      }),
    },
    canActivate: [participantRoleGuard],
    canActivateChild: [participantRoleChildGuard],
    loadComponent: () =>
      import('./features/participant/layout/participant-shell.component').then(
        (m) => m.default,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/participant/dashboard/dashboard.page').then(
            (m) => m.default,
          ),
      },
      {
        path: 'programmes',
        loadComponent: () =>
          import('./features/participant/programs/program-list.page').then(
            (m) => m.default,
          ),
      },
      {
        path: 'programmes/:programId/sessions/:sessionId',
        loadComponent: () =>
          import('./features/participant/programs/session-detail.page').then(
            (m) => m.default,
          ),
      },
      {
        path: 'programmes/:programId',
        loadComponent: () =>
          import('./features/participant/programs/program-detail.page').then(
            (m) => m.default,
          ),
      },
    ],
  },
];
