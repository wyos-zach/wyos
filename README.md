## WYOS (Writing Your Own Story)

A subscription-based membership platform for personal and professional development built with Next.js 15, focusing on authentic guidance through curated knowledge and resources.

## **Tech Stack**

### **Core Technologies**

- Next.js 15.1.3 with App Router
- React 19
- TypeScript 5.3.3
- Appwrite 16.1.0 (Backend)
- Zustand with Immer (State Management)
- TanStack Query v5 (Data Fetching)

### **UI & Styling**

- Tailwind CSS 3.4.17
- ShadcN UI
- Framer Motion 11.18.0
- Magic UI
- Aceternity UI

### **Development Tools**

- ESLint
- Prettier
- DeepSource
- WSL2 with Ubuntu 22.04.3 LTS
- PNPM Package Manager

## **Project Structure**

```markdown
src/
├── app/ # Next.js App Router routes
│ ├── (auth)/ # Authentication routes
│ ├── (core)/ # Protected features
│ └── (marketing)/ # Public pages
├── components/ # React components
│ ├── auth/ # Auth components
│ ├── core/ # Feature components
│ ├── marketing/ # Marketing components
│ ├── shared/ # Shared components
│ └── ui/ # UI components
├── lib/ # Utility functions
│ ├── actions/ # Server actions
│ ├── config/ # App configurations
│ ├── hooks/ # Custom React hooks
│ ├── providers/ # React providers
│ └── utils/ # Utility functions
├── models/ # Appwrite models
│ ├── client/ # Client-side config
│ └── server/ # Server-side config
├── store/ # State management
├── types/ # TypeScript types
└── middleware.ts # Next.js middleware
```

### **Development Setup**

1. Install dependencies:

```bash
pnpm install
```

1. Configure environment variables:

```tsx
# Appwrite
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_ENDPOINT=
APPWRITE_API_KEY=

# Teams
NEXT_PUBLIC_APPWRITE_TEAMS_ADMIN=
NEXT_PUBLIC_APPWRITE_TEAMS_MEMBERS=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PRICE_ID=
NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

1. Run development server:
2.

```tsx
pnpm dev
```

### **Project Documentation**

Refer to the `/docs` folder for detailed documentation:

- **`auth-flow.md`**: Authentication implementation
- **`component-guidelines.md`**: Component development standards
- **`project-structure.md`**: Project organization
- **`coding-standards.md`**: Development guidelines
