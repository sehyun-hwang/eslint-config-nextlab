// @ts-check

/* eslint sort-keys: "error" */

/** @type {import('eslint').Linter.RulesRecord} */
export const jsRules = {
  'arrow-parens': [
    'warn',
    'as-needed',
  ],
  curly: 'off',
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/*.test.*',
        '**/*.config.*',
      ],
    },
  ],
  'import/order': [
    'warn',
    {
      alphabetize: {
        caseInsensitive: true,
        order: 'asc',
      },
      'newlines-between': 'always',
    },
  ],
  'no-console': 'off',
  'no-nested-ternary': 'off',
  'no-promise-executor-return': 'off',
  'no-underscore-dangle': [
    'warn',
    {
      allow: [
        '__filename',
        '__dirname',
      ],
    },
  ],
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
      allowTaggedTemplates: true,
      allowTernary: true,
    },
  ],
  'nonblock-statement-body-position': [
    'warn',
    'below',
  ],
  'prefer-template': 'off',
  quotes: [
    'warn',
    'single',
  ],
  'require-await': 'error',
  semi: [
    'warn',
    'always',
  ],
  'sort-imports': ['warn',
    {
      allowSeparatedGroups: true,
      ignoreCase: true,
      ignoreDeclarationSort: true,
    },
  ],
  'sort-vars': 'warn',
};

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
const tsConfigFile = [{
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: true,
          properties: true,
          returns: false,
          variables: true,
        },
      },
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    indent: [
      'error',
      2,
      {
        flatTernaryExpressions: false,
        ignoredNodes: [
          'PropertyDefinition[decorators]',
          'TSUnionType',
          'FunctionExpression[params]:has(Identifier[decorators])',
        ],
        SwitchCase: 1,
      },
    ],
  },
}];

export default [{
  rules: jsRules,
}, ...tsConfigFile];

export const tsRules = tsConfigFile[0].rules;
