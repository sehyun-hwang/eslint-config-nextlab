import assert from 'assert/strict';

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import { packages } from '@eslint-stylistic/metadata';
import stylistic from '@stylistic/eslint-plugin';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbImportConfig from 'eslint-config-airbnb-base/rules/imports';
import importPlugin from 'eslint-plugin-import';

const compat = new FlatCompat();
const stylelisticMeta = packages.find(({ name }) => name === '@stylistic/eslint-plugin');

assert(stylelisticMeta);

const fixupLegacyRules = configs => {
  configs.forEach(config => {
    if (config.plugins)
      // eslint-disable-next-line no-param-reassign
      config.plugins = {};
    const { rules } = config;
    if (!rules)
      return;

    stylelisticMeta.rules.forEach(rule => {
      const ruleConfig = rules[rule.name];
      if (!ruleConfig)
        return;
      delete rules[rule.name];
      if (rules[rule.ruleId])
        console.log(`Legacy rule ${rule.name} not replace with ${rule.ruleId} due to conflict`, ruleConfig);
      else
        rules[rule.ruleId] = ruleConfig;
    });
  });
  return configs;
};

export default [
  importPlugin.flatConfigs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
  },
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
