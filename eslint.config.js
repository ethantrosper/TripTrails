import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Common settings for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      eqeqeq: "error",
      curly: "error",
      "no-console": "warn",
      semi: ["error", "always"],
    },
  },
  // JavaScript-specific settings
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      ...js.configs.recommended.rules,
      // Add any JavaScript-specific rules here
    },
  },
  // TypeScript-specific settings
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: ".",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs["recommended-requiring-type-checking"].rules,
      // Add any TypeScript-specific rules here
    },
  },
  // Prettier configuration to avoid conflicts with ESLint
  eslintConfigPrettier,
];
