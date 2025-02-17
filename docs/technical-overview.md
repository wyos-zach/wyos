technical-overview.md

## WYOS (Writing Your Own Story) - Technical Overview

## **Project Information**

- Project Name: WYOS (Writing Your Own Story)
- Start Date: January 15, 2025
- Framework: Next.js 15.1.3 (App Router)
- Language: TypeScript

### **Technical Stack**

- Core: React 19, Next.js 15.1.3
- Backend & Authentication: Appwrite
- State Management: Zustand with Immer
- Data Fetching: TanStack Query v5
- UI Framework: Tailwind CSS, ShadcN
- Animations: Framer Motion
- Code Quality: ESLint, Prettier, DeepSource

### **Project Structure**

```
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

### **Development Environment**

- WSL2 with Ubuntu 22.04.3 LTS
- Node.js LTS
- PNPM Package Manager
- VS Code with ESLint and Prettier integration

## **Database Structure**

### **Knowledge Database**

- Collections:
  - Knowledge
  - Categories
  - Tags

### **Resources Database**

- Collections:
  - Resources
  - Categories
  - ResourceTags

### **Storage Buckets**

- category-images
- category-icons
- knowledge-attachments
- resource-attachments

### **Authentication Flow**

- Email/Password authentication
- Google OAuth integration
- Password reset functionality
- Email verification
- Session persistence using Zustand

### **State Management**

- Zustand store with Immer for immutable updates
- TanStack Query for server state
- Persistent authentication state
- Type-safe store implementations

### **Current Features**

- Complete authentication system
- Knowledge section with infinite scroll
- Resources section with filtering
- Category navigation
- Search functionality with debounce
- Responsive layouts
- Dark mode support

### **Development Guidelines**

- Use Server Components by default
- Client Components only when necessary
- Implement proper loading and error states
- Follow TypeScript strict mode
- Maintain component-level documentation
- Use Zod for form validation

## **Dependencies**

**Core Dependencies**

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
  }
}
```

**Development Dependencies**

```json
{
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
- Tailwind Fold
- Path Intellisense
- ESLint
- Prettier
- indent-rainbow

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
- Keep commits focused on a single issue
