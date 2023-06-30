import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import { jsRules, tsRules } from './config/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const { default: localConfig } = await import(
  __dirname === process.cwd() ? './config/eslint.config.mock.js' : (process.cwd() + '/eslint.config.js')
)
  .catch(console.log) || {};

/**
import plugin:
@see https://github.com/import-js/eslint-plugin-import/issues/2556

typescript config:
@see https://stackoverflow.com/a/74279098
*/
export default [{
  // All eslint-plugin-import config is here
  languageOptions: {
    parserOptions: {
      // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
      // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    patchedImport: importPlugin,
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

...compat.extends('airbnb-base'),

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
