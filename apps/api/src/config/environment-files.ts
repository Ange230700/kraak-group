export function resolveApiEnvFilePaths(nodeEnv: string | undefined): string[] {
  const normalizedEnvironment = nodeEnv?.trim().toLowerCase() || 'local';

  if (normalizedEnvironment === 'local') {
    return ['.env.local', '.env'];
  }

  if (normalizedEnvironment === 'development') {
    return ['.env.development', '.env.local', '.env'];
  }

  return [`.env.${normalizedEnvironment}`, '.env'];
}
