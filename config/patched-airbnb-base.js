import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbImportConfig from 'eslint-config-airbnb-base/rules/imports';
import importPlugin from 'eslint-plugin-import';

const compat = new FlatCompat();

const legacyRules = {
  '@typescript-eslint/no-throw-literal': '@typescript-eslint/only-throw-error',
  ...Object.fromEntries([
    'brace-style',
    'comma-dangle',
    'comma-spacing',
    'func-call-spacing',
    'indent',
    'keyword-spacing',
    'lines-between-class-members',
    'no-extra-semi',
    'object-curly-spacing',
    'quotes',
    'semi',
    'space-before-blocks',
    'space-before-function-paren',
    'space-infix-ops',
  ].map(name => [`@typescript-eslint/${name}`, `stylistic/${name}`])),
};

const fixupLegacyRules = configs => {
  configs.forEach(config => {
    if (config.plugins)
      // eslint-disable-next-line no-param-reassign
      config.plugins = {};
    const { rules } = config;
    if (!rules)
      return;
    Object.entries(legacyRules).forEach(([legacyRule, newRule]) => {
      const ruleConfig = rules[legacyRule];
      if (ruleConfig) {
        delete rules[legacyRule];
        if (!rules[newRule]) {
          rules[newRule] = ruleConfig;
        }
      }
    });
  });
  return configs;
};

export default [
  importPlugin.flatConfigs.recommended,
  ...fixupLegacyRules(fixupConfigRules(compat.extends(
    ...airbnbBase.extends.filter(x => !x.endsWith('imports.js')),
  ))),
  ...compat.config({
    ...airbnbImportConfig,
    plugins: [],
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  }),
];
