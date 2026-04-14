import { describe, it, expect } from 'vitest';
import { routes } from './app.routes';

describe('Mobile routes', () => {
  const topPaths = routes.map((r) => r.path);

  it('should define onboarding and auth routes', () => {
    expect(topPaths).toContain('welcome');
    expect(topPaths).toContain('sign-in');
  });

  it('should define the tabs shell route', () => {
    expect(topPaths).toContain('tabs');
  });

  it('should redirect empty path to tabs', () => {
    const root = routes.find((r) => r.path === '' && r.redirectTo);
    expect(root).toBeDefined();
    expect(root?.redirectTo).toBe('tabs/accueil');
  });

  it('should have a wildcard fallback to tabs', () => {
    const wildcard = routes.find((r) => r.path === '**');
    expect(wildcard).toBeDefined();
    expect(wildcard?.redirectTo).toBe('tabs/accueil');
  });

  it('should define tab children routes', () => {
    const tabsRoute = routes.find((r) => r.path === 'tabs');
    const childPaths = tabsRoute?.children?.map((c) => c.path);
    expect(childPaths).toContain('accueil');
    expect(childPaths).toContain('programmes');
    expect(childPaths).toContain('annonces');
    expect(childPaths).toContain('support');
    expect(childPaths).toContain('ressources');
  });

  it('should define a nested stack route for programme details', () => {
    const tabsRoute = routes.find((r) => r.path === 'tabs');
    const programsRoute = tabsRoute?.children?.find(
      (child) => child.path === 'programmes',
    );
    const childPaths = programsRoute?.children?.map((child) => child.path);

    expect(childPaths).toEqual(['', ':id']);
  });
});
