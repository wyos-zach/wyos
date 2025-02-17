environment-setup.md

## WYOS Environment Setup Documentation

## Version Requirements

### System Requirements

- Windows 11 running WSL2 with Ubuntu 22.04.3 LTS
- Node.js 22.12.0
- PNPM 9.15.4

## VS Code Setup

### Required Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- PostCSS Language Support
- DeepSource Autofix Ai
- GitHub Copilot

### Core Dependencies

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.3",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-switch": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.2",
    "@radix-ui/react-tooltip": "^1.1.6",
    "@shadcn/ui": "^0.0.4",
    "@tabler/icons-react": "^3.28.1",
    "@tanstack/react-query": "^5.64.2",
    "@tanstack/react-query-devtools": "^5.64.2",
    "appwrite": "^16.1.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "motion/react": "^11.18.0",
    "lucide-react": "^0.471.1",
    "next": "15.1.4",
    "node-appwrite": "^14.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tanstack/eslint-plugin-query": "^5.64.2",
    "@types/node": "^20.17.13",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@typescript-eslint/eslint-plugin": "^8.20.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "postcss": "^8.5.1",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.10",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
```

## Current Project Structure

```bash
src/
├── app/
│   ├── (auth)/             # Authentication routes
│   ├── (core)/             # Protected features
│   ├── (marketing)/        # Public pages
│   └── auth/               # OAuth callback routes
│
├── components/
│   ├── auth/              # Auth components
│   ├── core/              # Feature components
│   │   ├── knowledge/
│   │   └── resources/
│   ├── marketing/         # Marketing components
│   ├── shared/           # Shared components
│   └── ui/               # ShadcN components
│
├── lib/
│   ├── actions/          # Server actions
│   ├── config/          # App configurations
│   ├── hooks/           # Custom React hooks
│   ├── providers/       # React providers
│   └── utils/           # Utility functions
│
├── models/              # Appwrite models
│   ├── client/
│   └── server/
│       └── collections/
│
├── store/              # State management
│   └── Auth.ts
│
├── types/             # TypeScript types
└── middleware.ts      # Next.js middleware
```

## Current Configuration Files

### Workspace Settings (settings.json)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.linkedEditing": true,
  "editor.guides.bracketPairs": true,
  "editor.bracketPairColorization.enabled": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "css.lint.unknownAtRules": "ignore",
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.suggest.autoImports": true
}
```

### ESLint (eslint.config.mjs)

```jsx
// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ),
  eslintConfigPrettier,
  {
    plugins: ['@tanstack/query'],
    rules: {
      // TanStack Query
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/prefer-query-object': 'error',
      '@tanstack/query/stable-query-client': 'error',

      // TypeScript
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

      // React
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'error',
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',

      // Console and Debugging
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
    },
  },
];

export default eslintConfig;
```

### Prettier (.prettierrc)

```json
{
  "trailingComma": "es5",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 80,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### ShadcN (components.json)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Development Workflow

### Branch Management

- **Main Branch**: `main`
  - Production-ready code
- **Development Branch**: `develop`
  - Primary development branch
  - Base for feature branches
- **Feature Branches**: **`feature/*`**
  - New features and enhancements
- **Fix Branches**: **`fix/*`**
  - Bug fixes and patches

### Feature Development Process

```bash
# Create new feature branch
git checkout develop
git pull origin develop
git checkout -b feature/feature-name

# When feature is complete
git checkout develop
git merge feature/feature-name
git push origin develop
```

### Development Guidelines

- Commit frequently with clear messages
- Keep changes focused and atomic
- Update documentation as needed

## Getting Started

1. Clone and install

```bash
git clone https://github.com/wyos-zach/wyos.git
cd wyos
pnpm install
```

1. Start Development

```bash
pnpm dev
```

### Development Commands

```bash
pnpm dev     # Start development server with turbopack
pnpm build   # Create production build
pnpm start   # Start production server
pnpm lint    # Run ESLint
```
