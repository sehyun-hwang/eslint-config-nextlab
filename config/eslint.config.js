// @ts-check
/* eslint sort-keys: "error" */

import { rules } from '@eslint-stylistic/metadata';

const noUnusedVarParams = {
  argsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
};

const originalIds = new Set(rules.map(({ originalId }) => originalId));

/** @type {import('eslint').Linter.RulesRecord} */
export const jsRules = {
  '@stylistic/arrow-parens': ['warn', 'as-needed'],
  '@stylistic/nonblock-statement-body-position': ['warn', 'below'],
  '@stylistic/quotes': ['warn', 'single', {
    avoidEscape: true,
  }],
  '@stylistic/semi': ['warn', 'always'],
  curly: 'off',
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': ['error', {
    devDependencies: [
      '**/*.test.*',
      '**/*.config.*',
    ],
  }],
  'import/order': ['warn', {
    alphabetize: {
      caseInsensitive: true,
      order: 'asc',
    },
    'newlines-between': 'always',
  }],
  'no-console': 'off',
  'no-nested-ternary': 'off',
  'no-promise-executor-return': 'off',
  'no-underscore-dangle': ['warn', {
    allow: [
      '__filename',
      '__dirname',
    ],
  }],
  'no-unused-expressions': ['warn', {
    allowShortCircuit: true,
    allowTaggedTemplates: true,
    allowTernary: true,
  }],
  'no-unused-vars': ['error', noUnusedVarParams],
  'prefer-template': 'off',
  'require-await': 'error',
  'sort-imports': ['warn', {
    allowSeparatedGroups: true,
    ignoreCase: true,
    ignoreDeclarationSort: true,
  }],
  'sort-vars': 'warn',
};

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
const tsConfigFile = [{
  files: ['**/*.ts'],
  rules: {
    '@stylistic/comma-dangle': ['warn', {
      ...{
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
      ...{
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      },
    }],
    '@stylistic/indent': ['error', 2, {
      flatTernaryExpressions: false,
      ignoredNodes: [
        'PropertyDefinition[decorators]',
        'TSUnionType',
        'FunctionExpression[params]:has(Identifier[decorators])',
      ],
      SwitchCase: 1,
    }],
    '@typescript-eslint/no-misused-promises': ['error', {
      checksVoidReturn: {
        arguments: false,
        attributes: true,
        properties: true,
        returns: false,
        variables: true,
      },
    }],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unused-vars': ['error', noUnusedVarParams],
    'no-unused-vars': 'off',
  },
}];

export default [{
  rules: jsRules,
}, ...tsConfigFile];

export const tsRules = tsConfigFile[0].rules;

const legacyRules = [...Object.keys(jsRules), ...Object.keys(tsRules)]
  .filter(rule => originalIds.has(rule));
if (legacyRules.length)
  throw new Error(`Legacy rules have to be migrated: ${legacyRules}`);
