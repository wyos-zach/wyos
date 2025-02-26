# WYOS Project Structure Documentation

## Root Directory Organization

The project follows Next.js 15.1.3 best practices with a `src` directory structure.

## Directory Breakdown

### App Directory (`src/app/`)

```tsx
src/app/
├── (auth)/             # Authentication routes
│   ├── forgot-password/
│   ├── login/
│   ├── register/
│   ├── request-verification/
│   ├── reset-password/
│   ├── verify-email/
│   └── layout.tsx
├── (core)/            # Protected features
│   ├── dashboard/
│   ├── knowledge/
│   ├── resources/
│   └── community/
├── (marketing)/       # Public pages
│   ├── about/
│   ├── membership/
│   ├── layout.tsx
│   └── page.tsx
├── (subscription)/    # Subscription routes
│   ├── cancel/
│   ├── success/
│   ├── error.tsx
│   ├── layout.tsx
│   └── loading.tsx
├── api/              # API routes
│   ├── discourse/
│   ├── image/
│   ├── revalidate/
│   └── webhooks/
├── auth/             # OAuth callbacks
│   └── callback/
├── globals.css
└── layout.tsx
```

### Components Directory (`src/app/components/`)

```tsx
src/components/
├── auth/              # Auth components
│   ├── forms/         # Auth form components
│   └── shared/        # Shared auth components
├── core/              # Main feature components
│   ├── community/
│   ├── knowledge/
│   └── resources/
├── marketing/         # Marketing components
│   ├── about/
│   ├── home/
│   └── membership/
├── shared/            # Shared/common components
│   ├── layout/
│   └── navigation/
└── ui/               # ShadcN UI components
```

### Library Directory (`src/lib/`)

```tsx
src/lib/
├── actions/        # Server actions
├── config/         # App configurations
│   ├── site/
│   └── env.ts
├── hooks/          # Custom React hooks
│   ├── auth/
│   └── shared/
├── providers/      # React providers
├── utils/          # Utility functions
│   ├── shadcn/     # ShadcN utilities
│   └── helpers/    # Custom utilities
└── models/         # Appwrite models
```

### Models Directory (`src/models/`)

```tsx
src/models/
├── client/
│   └── config.ts
└── server/
    ├── api.ts
    ├── config.ts
    ├── dbSetup.ts
    ├── storageSetup.ts
    └── collections/
        ├── knowledge.collection.ts
        ├── resources.collection.ts
        └── tags.collection.ts
```

### Types Directory (`src/types/`)

```tsx
src/types/
├── auth/
├── core/
│   ├── knowledge/
│   └── resources/
├── marketing/
└── shared/
```

### Store Directory (`src/store/`)

```tsx
src/store/
└── Auth.ts         # Authentication store
```

## File Naming Conventions

- Components: PascalCase (e.g., `LoginForm.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Pages: page.tsx in appropriate route directory
- Types: PascalCase (e.g., `auth.ts`)

## Middleware

The middleware.ts file is located at the root of the src directory, handling authentication and routing logic
