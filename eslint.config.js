import globals from "globals";
import pluginJs from "@eslint/js";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,

 {
     rules: {
         "no-unused-vars": "warn",
         "no-undef": "warn"
     }
 }
];

/*
export default [

  in files I had to escape out the * because the parser was
  thinking that it was the end of the comment which it was not

  { files: ["*//*/*.{js,mjs,cjs,ts,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
*/