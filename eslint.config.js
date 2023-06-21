import path from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

import lagacyConfig from './eslint.json' assert {type: 'json'};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { rules } = lagacyConfig;
const localConfig = await import(process.cwd() + '/eslint.config.js')
  .catch(error => {
    console.log(error);
    return [];
  });

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [

  ...compat.extends("airbnb-base"),

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest"
    },
    rules,
  },

  ...localConfig
];
