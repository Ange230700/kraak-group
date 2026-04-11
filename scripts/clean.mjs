import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, '..');
const workspacePath = normalizeWorkspacePath(
  path.relative(repoRoot, process.cwd()),
);
const dryRun = process.argv.includes('--dry-run');

const targetsByWorkspace = new Map([
  [
    '.',
    [
      '.cache',
      '.vercel',
      'blob-report',
      'coverage',
      'playwright-report',
      'test-results',
    ],
  ],
  [
    'apps/client',
    [
      '.angular',
      '.vercel',
      'blob-report',
      'coverage',
      'dist',
      'playwright-report',
      'test-results',
    ],
  ],
  ['apps/api', ['coverage', 'dist']],
  ['packages/api-client', ['coverage', 'dist']],
  ['packages/contracts', ['coverage', 'dist']],
  ['packages/domain', ['coverage', 'dist']],
  ['packages/tokens', ['coverage', 'dist']],
]);

const targets = targetsByWorkspace.get(workspacePath);

if (!targets) {
  console.error(
    `Aucune configuration clean definie pour le workspace "${workspacePath}".`,
  );
  process.exitCode = 1;
} else {
  const cleanedTargets = [];

  for (const target of targets) {
    const absoluteTarget = path.join(process.cwd(), target);

    if (!dryRun) {
      await rm(absoluteTarget, { force: true, recursive: true });
    }

    cleanedTargets.push(target);
  }

  const action = dryRun ? 'seraient nettoyes' : 'nettoyes';
  console.log(
    `[clean] ${workspacePath} : ${cleanedTargets.join(', ')} ${action}.`,
  );
}

function normalizeWorkspacePath(value) {
  if (!value) {
    return '.';
  }

  return value.split(path.sep).join('/');
}
