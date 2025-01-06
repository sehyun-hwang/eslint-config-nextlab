// @ts-check

/** @type {import('eslint').Linter.RulesRecord} */
export const jsRules = {
  'arrow-parens': [
    'warn',
    'as-needed',
  ],
  curly: 'off',
  'import/extensions': 'off',
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
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
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
        SwitchCase: 1,
        flatTernaryExpressions: false,
        ignoredNodes: [
          'PropertyDefinition[decorators]',
          'TSUnionType',
          'FunctionExpression[params]:has(Identifier[decorators])',
        ],
      },
    ],
  },
}];

export default [{
  rules: jsRules,
}, ...tsConfigFile];

export const tsRules = tsConfigFile[0].rules;
