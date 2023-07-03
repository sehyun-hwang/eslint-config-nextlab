import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import airbnbBase from 'eslint-config-airbnb-base';
import importPlugin from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

import { jsRules, tsRules } from './config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat();

const { default: localConfig } = await (__dirname === process.cwd()
  ? Promise.resolve() : import(process.cwd() + '/eslint.config.js'))
  .catch(console.log) || {};
console.log('localConfig', localConfig);

const { default: importConfig } = await import(airbnbBase.extends.find(x => x.endsWith('imports.js')));
importConfig.plugins = [];

/**
import plugin:
@see https://github.com/import-js/eslint-plugin-import/issues/2556

typescript config:
@see https://stackoverflow.com/a/74279098
*/
export default [
  {
    // All eslint-plugin-import config is here
    languageOptions: {
      parserOptions: {
        // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
        // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {},
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      // This will do the trick
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        node: true,
      },
    },
  },

  ...compat.extends(join(__dirname, '/config/importless-airbnb-base.cjs')),
  ...compat.config(importConfig),

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: jsRules,
  },

  {
    files: ['*config.js', '*config.ts'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
      ...jsRules,
      ...tsRules,
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },

  ...(localConfig || []),
];
