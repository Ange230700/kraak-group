import { resolveApiEnvFilePaths } from './environment-files';

describe('resolveApiEnvFilePaths', () => {
  it('Given NODE_ENV is missing, When env files are resolved, Then local configuration is preferred', () => {
    expect(resolveApiEnvFilePaths(undefined)).toEqual(['.env.local', '.env']);
  });

  it('Given NODE_ENV is local, When env files are resolved, Then .env.local is used before the legacy fallback', () => {
    expect(resolveApiEnvFilePaths('local')).toEqual(['.env.local', '.env']);
  });

  it('Given NODE_ENV is development, When env files are resolved, Then compatibility with .env.local is preserved', () => {
    expect(resolveApiEnvFilePaths('development')).toEqual([
      '.env.development',
      '.env.local',
      '.env',
    ]);
  });

  it('Given NODE_ENV is staging, When env files are resolved, Then .env.staging is loaded before the legacy fallback', () => {
    expect(resolveApiEnvFilePaths('staging')).toEqual([
      '.env.staging',
      '.env',
    ]);
  });
});
