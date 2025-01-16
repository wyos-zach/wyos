# WYOS (Write Your Own Story) - Technical Overview

## Project Information

- Project Name: WYOS (Write Your Own Story)
- Start Date: January 15, 2025
- Framework: Next.js 15.1.4 (App Router)
- Language: TypeScript

## Technical Stack

- Core: React 19, Next.js 15.1.4
- Authentication: Appwrite
- Payments: Stripe
- UI Framework: Tailwind CSS, ShadcN
- Animations: Framer Motion
- Code Quality: ESLint, Prettier, DeepSource

## Project Structure

```bash
/src
├── app/
│   ├── (auth)/
│   ├── (main)/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── auth/
│   ├── common/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── actions/
│   ├── config/
│   ├── hooks/
│   ├── store/
│   └── utils/
└── types/
```

## Development Environment

- WSL2 with Ubuntu 22.04.3 LTS
- Node.js
- PNPM Package Manager
- VS Code with ESLint and Prettier integration

## **Version Specifications**

**Core Framework**

- Next.js: 15.1.4
- React: 19.0.0
- TypeScript: 5.3.3

**Backend & Authentication**

- Appwrite: 16.1.0

**UI & Styling**

- Tailwind CSS: 3.4.17
- ShadcN UI: Latest
- Framer Motion: 11.18.0

## **Dependencies**

**Core Dependencies**

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
  }
}
```

**Development Dependencies**

```json
{
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

### **VS Code Configuration**

**Required Extensions**

- DeepSource Autofix AI
- GitHub Copilot
- GitHub Copilot Chat
- Vision for Copilot
- Remote Repositories
- GitHub Repositories
- ES7 React/Redux/GraphQL/React-Native snippets
- PostCSS Language Support
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### **Git Workflow**

**Branch Structure**

```bash
main           # Production-ready code
├── develop    # Main development branch
│   ├── feature/*  # New features
│   └── fix/*      # Bug fixes

```

**Branch Naming Convention**

- Feature branches: **`feature/feature-name`**
- Bug fix branches: **`fix/bug-description`**
- Release branches: **`release/version-number`**

**Commit Guidelines**

- Use conventional commits format
- Keep commits focused
