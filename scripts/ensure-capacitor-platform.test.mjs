import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  ensureCapacitorPlatform,
  getCapacitorPlatformDirectory,
  parseCapacitorPlatform,
} from './ensure-capacitor-platform.mjs';

test('parseCapacitorPlatform accepte android et ios', () => {
  assert.equal(parseCapacitorPlatform(['android']), 'android');
  assert.equal(parseCapacitorPlatform(['ios']), 'ios');
});

test('parseCapacitorPlatform rejette une plateforme inconnue', () => {
  assert.throws(
    () => parseCapacitorPlatform(['web']),
    /Plateforme Capacitor invalide/u,
  );
});

test("parseCapacitorPlatform signale explicitement l'absence d'argument", () => {
  assert.throws(
    () => parseCapacitorPlatform([]),
    /Plateforme Capacitor manquante/u,
  );
});

test("ensureCapacitorPlatform n'appelle pas cap add quand la plateforme existe déjà", () => {
  const tempRoot = mkdtempSync(
    path.join(os.tmpdir(), 'kraak-capacitor-platform-'),
  );
  const clientRootPath = path.join(tempRoot, 'apps', 'client');
  const platformDirectory = path.join(clientRootPath, 'android');
  let commandCallCount = 0;

  try {
    mkdirSync(platformDirectory, { recursive: true });

    const result = ensureCapacitorPlatform('android', {
      clientRootPath,
      runCommand: () => {
        commandCallCount += 1;
        return { status: 0 };
      },
    });

    assert.equal(commandCallCount, 0);
    assert.deepEqual(result, {
      created: false,
      platform: 'android',
      platformDirectory,
    });
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('ensureCapacitorPlatform lance cap add quand la plateforme manque', () => {
  const tempRoot = mkdtempSync(
    path.join(os.tmpdir(), 'kraak-capacitor-platform-'),
  );
  const clientRootPath = path.join(tempRoot, 'apps', 'client');
  const expectedDirectory = getCapacitorPlatformDirectory('android', {
    clientRootPath,
  });
  const calls = [];

  try {
    mkdirSync(clientRootPath, { recursive: true });

    const result = ensureCapacitorPlatform('android', {
      clientRootPath,
      runCommand: (command, args, options) => {
        calls.push({ args, command, options });
        mkdirSync(expectedDirectory, { recursive: true });
        return { status: 0 };
      },
    });

    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0], {
      args: ['cap', 'add', 'android'],
      command: process.platform === 'win32' ? 'npx.cmd' : 'npx',
      options: {
        cwd: clientRootPath,
        stdio: 'inherit',
      },
    });
    assert.deepEqual(result, {
      created: true,
      platform: 'android',
      platformDirectory: expectedDirectory,
    });
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});
