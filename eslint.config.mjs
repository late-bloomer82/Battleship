import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {},
  },
  {
    //Using deprecated eslint version, normally its the ignores key
    ignoresPatterns: ["babel.config.js", "webpack.config.js", ".tests/*"],
  },
];
