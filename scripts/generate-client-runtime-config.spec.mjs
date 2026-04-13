// scripts\generate-client-runtime-config.spec.mjs

/* global console */

import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { loadClientRuntimeConfig } from './generate-client-runtime-config.mjs';

function runTest(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

runTest(
  'le runtime client peut lire les variables staging depuis process.env quand aucun fichier .env n est disponible',
  () => {
    const tempRoot = mkdtempSync(path.join(os.tmpdir(), 'kraak-client-runtime-config-'));

    try {
      const runtimeConfig = loadClientRuntimeConfig('staging', {
        clientRootPath: tempRoot,
        processEnv: {
          CLIENT_API_BASE_URL: 'https://kraak-api.onrender.com/',
          SUPABASE_URL: 'https://qgttdsnupelohowwkkwb.supabase.co',
          SUPABASE_PUBLISHABLE_KEY:
            'sb_publishable_5CKjUPh9rFkuUlwHyLIYpQ_c_plqe57',
        },
      });

      assert.deepEqual(runtimeConfig, {
        apiBaseUrl: 'https://kraak-api.onrender.com/',
        supabaseUrl: 'https://qgttdsnupelohowwkkwb.supabase.co',
        supabasePublishableKey: 'sb_publishable_5CKjUPh9rFkuUlwHyLIYpQ_c_plqe57',
      });
    } finally {
      rmSync(tempRoot, { recursive: true, force: true });
    }
  },
);
