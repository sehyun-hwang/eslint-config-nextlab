/* eslint-disable */
import jsConfig from '../.eslintrc.json' with {type: 'json'};
import tsConfig from './typescript.eslintrc.json' with {type: 'json'};

export const jsRules = jsConfig.rules;
export const tsRules = tsConfig.rules;
