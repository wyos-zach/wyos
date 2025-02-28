# WYOS (Writing Your Own Story)

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

### **CSS Organization Guidelines**

## Structure

Our global CSS is organized into these clear sections:

1. **CSS Reset & Base Styles**: Normalize browser styles and set basics
2. **Typography**: Text styles for headings, paragraphs, links
3. **Layout & Containers**: Flex, grid, and layout utilities
4. **Spacing Utilities**: Margin and padding helper classes
5. **Buttons & Form Elements**: Form controls styling
6. **Cards & Component Styles**: Reusable component styles
7. **Utility Classes**: Display, text alignment, etc.
8. **Responsive Utilities**: Mobile breakpoints
9. **Theme Variables**: CSS variables for theming

## Naming Conventions

- Use kebab-case for component classes (e.g., `.card-header`)
- Use utility classes with shorthand (e.g., `.mb-4` for margin-bottom: 1rem)
- Prefix responsive utilities with breakpoint (e.g., `.md\:hidden`)

## Best Practices

- Keep related styles grouped together
- Add comments to mark sections
- Avoid deep nesting of selectors
- Use CSS variables for theming and consistent values
- Consolidate duplicate properties
- Maintain alphabetical order within rule sets when possible

## How to Add New Styles

1. Identify which section your style belongs to
2. Check if a similar style already exists
3. Add your style to the appropriate section
4. Add comments for complex styles
5. Consider if the style should be a utility or component
