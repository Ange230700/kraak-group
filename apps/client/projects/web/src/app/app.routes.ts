import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page'),
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./features/about/about.page'),
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services.page'),
  },
  {
    path: 'programmes',
    loadComponent: () => import('./features/programs/programs.page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
