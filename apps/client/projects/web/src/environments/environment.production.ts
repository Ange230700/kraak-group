const defaultSiteUrl = 'https://kraak-group.vercel.app';
const runtimeGlobals = globalThis as typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
};
const runtimeSiteUrl = runtimeGlobals.process?.env?.['PUBLIC_SITE_URL']
  ? runtimeGlobals.process.env['PUBLIC_SITE_URL']
  : defaultSiteUrl;

export const environment = {
  environmentName: 'production',
  production: true,
  siteUrl: runtimeSiteUrl,
  apiBaseUrl: '',
  supabaseUrl: '',
  supabasePublishableKey: '',
  ga4Id: '',
};
