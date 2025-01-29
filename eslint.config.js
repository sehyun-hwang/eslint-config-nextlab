import { dirname } from 'path';
import { fileURLToPath } from 'url';

import tseslint from 'typescript-eslint';

import { jsRules, tsRules } from './config/eslint.config.js';
import patchedAirbnb from './config/patched-airbnb-base.js';

const SYMBOL = Symbol('nextlab-eslint');

const tseslintStrictTypeChecked = tseslint.configs.strictTypeChecked.find(({ name }) => name === 'typescript-eslint/strict-type-checked');
const patchedTseslintStrictTypeChecked = tseslint.configs.strictTypeChecked
  .filter(x => x !== tseslintStrictTypeChecked)
  .map(x => (x.name === 'typescript-eslint/eslint-recommended' ? {
    ...x,
    rules: { ...x.rules, ...tseslintStrictTypeChecked.rules },
  } : x));

const config = [{
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
},

...patchedAirbnb,

{
  files: ['**/*.js'],
  languageOptions: {
    ecmaVersion: 'latest',
  },
  rules: jsRules,
},

...patchedTseslintStrictTypeChecked,
...tseslint.configs.stylistic,

{
  files: ['**/*.ts'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    ...jsRules,
    ...tsRules,
  },
},
];

config[SYMBOL] = true;

function throwIfModuleFound(error) {
  if (error.code !== 'ERR_MODULE_NOT_FOUND')
    throw error;
}

async function mergeLocalConfig() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  if (__dirname === process.cwd())
    return;
  const { default: localConfig } = await import(process.cwd() + '/eslint.config.js')
    .then(x => x, error => {
      throwIfModuleFound(error);
      return import(process.cwd() + '/eslint.config.mjs');
    })
    .catch(throwIfModuleFound) || {};
  if (!localConfig)
    return;
  if (localConfig[SYMBOL])
    return;

  console.log('localConfig', localConfig);
  config.push(...localConfig);
}

// console.log(config);
await mergeLocalConfig();

export default config;
