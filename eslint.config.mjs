import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import prettierEslint from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.url,
        project: ['tsconfig.json'],
        globals: globals.builtin,
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      unicorn: eslintPluginUnicorn,
      prettier: prettierEslint,
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'vite.config.js',
      'eslint.config.mjs',
      'src/uikit',
    ],
  },
  {
    files: ['**/*.{tsx, ts}'],
    rules: {
      'no-unused-expressions': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },
]);
