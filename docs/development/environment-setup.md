# WYOS Environment Setup Documentation

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
    "@shadcn/ui": "^0.0.4",
    "appwrite": "^16.1.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.18.0",
    "lucide-react": "^0.471.1",
    "next": "15.1.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20.17.13",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
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
│ ├── (auth)/ # Authentication routes (login, register, etc.)
│ ├── (main)/ # Main application routes
│ ├── favicon.ico
│ ├── globals.css # Global styles and Tailwind directives
│ └── layout.tsx # Root layout component
├── components/
│ ├── auth/ # Authentication related components
│ ├── common/ # Shared components
│ ├── forms/ # Form components
│ ├── layout/ # Layout components (header, footer, etc.)
│ └── ui/ # ShadcN UI components
├── lib/
│ ├── actions/ # Server actions
│ ├── config/ # Configuration files
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Utility functions
│ └── utils.ts # Shared utility functions
└── types/ # TypeScript type definitions
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
  "tailwindCSS.experimental.classRegex": [],
  "css.lint.unknownAtRules": "ignore",
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### ESLint (eslint.config.mjs)

```jsx
// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
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
