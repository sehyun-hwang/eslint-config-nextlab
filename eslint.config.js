import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from "eslint-plugin-import";

import legacyConfig from './eslint.json' assert {type: 'json'};
const { rules } = legacyConfig;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const { default: localConfig } = await import(process.cwd() + '/eslint.config.js')
  .catch(console.log) || {};

export default [
  // @link https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
  {
    // All eslint-plugin-import config is here
    languageOptions: {
      parserOptions: {
        // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
        // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      patchedImport: importPlugin
    },
    settings: {
      // This will do the trick
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"],
      },
      "import/resolver": {
        node: true,
      },
    },
    rules: {
      ...importPlugin.configs["recommended"].rules,
    },
  },

  ...compat.extends("airbnb-base"),

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules,
  },

  ...(localConfig || []),
];
