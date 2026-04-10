import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./features/onboarding/welcome.page'),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./features/auth/sign-in.page'),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./layouts/tabs/tabs.layout').then((m) => m.TabsLayout),
    children: [
      {
        path: 'accueil',
        loadComponent: () => import('./features/dashboard/home.page'),
      },
      {
        path: 'programmes',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/programs/program-list.page'),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/programs/program-detail.page'),
          },
        ],
      },
      {
        path: 'annonces',
        loadComponent: () =>
          import('./features/announcements/announcement-list.page'),
      },
      {
        path: 'support',
        loadComponent: () => import('./features/support/support.page'),
      },
      {
        path: 'ressources',
        loadComponent: () => import('./features/resources/resource-list.page'),
      },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: '**', redirectTo: 'tabs' },
];
