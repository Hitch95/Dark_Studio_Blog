import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "./pluginReactConfig.mjs";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
];