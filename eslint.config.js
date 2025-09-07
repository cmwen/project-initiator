// ESLint v9 flat config for Project Initiator
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  // Ignore build artifacts
  { ignores: ['dist/**'] },

  // Base JS recommendations
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
  },

  // TypeScript/TSX files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        // Test globals
        ...globals.jest,
        vi: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      prettier,
    },
    settings: { react: { pragma: 'h', version: 'detect' } },
    rules: {
      // React recommendations
      ...(reactPlugin.configs?.recommended?.rules ?? {}),
      // Preact/modern JSX
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // Prettier as an ESLint rule
      'prettier/prettier': 'warn',
      // Prefer TS-aware unused vars, disable base rules that conflict with TS
      'no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
    },
  },

  // JS/JSX files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react: reactPlugin,
      prettier,
    },
    settings: { react: { pragma: 'h', version: 'detect' } },
    rules: {
      ...(reactPlugin.configs?.recommended?.rules ?? {}),
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'prettier/prettier': 'warn',
    },
  },

  // Node-based config files
  {
    files: [
      'vite.config.*',
      'tailwind.config.*',
      'eslint.config.*',
      '**/*.config.*',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },

  // Tests
  {
    files: ['tests/**/*', '**/*.test.*', '**/*.spec.*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.jest,
        vi: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
