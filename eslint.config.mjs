import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ),
  eslintConfigPrettier,
  {
    rules: {
      // TanStack Query rules:
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/stable-query-client': 'error',

      // TypeScript rules:
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',

      // React rules:
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'error',
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',

      // Console & Debug rules:
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Accessibility rules:
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
    },
  },
];
