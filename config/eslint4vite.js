import { resolve } from 'path';
import { fileURLToPath } from 'url';

import eslint from 'eslint';

const overrideConfigFile = resolve(fileURLToPath(import.meta.url), '../..', 'eslint.config.js');

// @TODO Needs testing
// eslint-disable-next-line import/prefer-default-export
export class ESLint extends eslint.Linter {
  constructor(params) {
    Object.assign(params, { overrideConfigFile });
    super(params);
  }
}
