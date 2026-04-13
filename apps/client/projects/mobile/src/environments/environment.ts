const defaultSiteUrl = 'http://localhost:4300';
const runtimeOrigin =
  typeof globalThis !== 'undefined' &&
  'location' in globalThis &&
  globalThis.location?.origin
    ? globalThis.location.origin
    : defaultSiteUrl;

export const environment = {
  production: false,
  siteUrl: runtimeOrigin,
  apiBaseUrl: 'http://localhost:3000',
  ga4Id: '',
};
