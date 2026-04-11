import { routes } from './app.routes';

describe('Web routes', () => {
  const paths = routes.map((r) => r.path);

  it('should define all public marketing routes', () => {
    expect(paths).toContain('');
    expect(paths).toContain('a-propos');
    expect(paths).toContain('services');
    expect(paths).toContain('programmes');
    expect(paths).toContain('contact');
  });

  it('should have a wildcard fallback redirecting to home', () => {
    const wildcard = routes.find((r) => r.path === '**');
    expect(wildcard).toBeDefined();
    expect(wildcard!.redirectTo).toBe('');
  });

  it('should lazy-load every page component', () => {
    const pageRoutes = routes.filter((r) => r.path !== '**');
    for (const route of pageRoutes) {
      expect(route.loadComponent).toBeDefined();
    }
  });

  it('should attach a title and SEO metadata to every public marketing route', () => {
    const pageRoutes = routes.filter((r) => r.path !== '**');

    for (const route of pageRoutes) {
      expect(route.title).toEqual(expect.any(String));
      expect(route.data?.['seo']).toBeDefined();
    }
  });
});
