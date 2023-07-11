#!/usr/bin/env node
import { fileURLToPath } from 'url';

export function getEslintPath() {
  console.log(import.meta.url);

  if (!import.meta.resolve)
    throw new Error(`import.meta.resolve is not a function.
       Please use NODE_OPTIONS=--experimental-import-meta-resolve env`);

  return fileURLToPath(import.meta.resolve('../config/eslint4vite.js'));
}

let eslintPath = null;
try {
  eslintPath = getEslintPath();
} catch (error) {
  console.log(error);
}

export const vitePluginConfig = {
  eslintPath,
  fix: process.stdin.isTTY,
};
