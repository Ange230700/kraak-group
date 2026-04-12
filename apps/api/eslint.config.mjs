import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';
import nodePlugin from 'eslint-plugin-n';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    extends: [
      nodePlugin.configs['flat/recommended'],
      promise.configs['flat/recommended'],
    ],
    plugins: {
      prettier: prettierPlugin,
      sonarjs,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'prettier/prettier': 'error',
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-identical-expressions': 'error',
    },
  },
  {
    files: ['src/**/*.spec.ts'],
    extends: [jest.configs['flat/recommended']],
    rules: {
      'n/no-extraneous-import': 'off',
      'n/no-extraneous-require': 'off',
    },
  },
  prettier,
);
