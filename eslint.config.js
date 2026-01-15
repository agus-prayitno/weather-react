import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist', 'node_modules', 'build'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: '19.0',
      },
    },
  },
];
