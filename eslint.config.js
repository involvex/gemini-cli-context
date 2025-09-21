import js from "@eslint/js";
import globals from "globals";
import prettierConfig from 'eslint-config-prettier';

export default [
  {languageOptions: { globals: { ...globals.node, ...globals.browser } }},
  js.configs.recommended,
  prettierConfig,

];
