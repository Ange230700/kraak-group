import { KraakI18nService } from '../../../shared/i18n';
import { inject } from '@angular/core';
import { type CanMatchFn, Routes } from '@angular/router';

import { adminRoleChildGuard, adminRoleGuard } from './core/auth/auth.guard';

export const adminAreaCanMatch: CanMatchFn = () => true;

export const adminAreaRoutes: Routes = [
  {
    path: 'admin',
    canMatch: [adminAreaCanMatch],
    canActivate: [adminRoleGuard],
    canActivateChild: [adminRoleChildGuard],
    children: [
      {
        path: 'dashboard',
        title: () =>
          inject(KraakI18nService).translate('web.admin.routes.dashboard'),
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.page'),
      },
      {
        path: 'programmes',
        title: () =>
          inject(KraakI18nService).translate('web.admin.routes.programmes'),
        loadComponent: () =>
          import('./features/admin/programmes/admin-programmes.page'),
      },
      {
        path: 'curriculum',
        title: () =>
          inject(KraakI18nService).translate('web.admin.routes.curriculum'),
        loadComponent: () =>
          import('./features/admin/curriculum/admin-curriculum.page'),
      },
      {
        path: 'ressources',
        title: () =>
          inject(KraakI18nService).translate('web.admin.routes.ressources'),
        loadComponent: () =>
          import('./features/admin/ressources/admin-ressources.page'),
      },
      {
        path: 'utilisateurs',
        title: () =>
          inject(KraakI18nService).translate('web.admin.routes.users'),
        loadChildren: () =>
          import('./features/admin/utilisateurs/utilisateurs.routes'),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
