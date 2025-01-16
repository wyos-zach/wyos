# WYOS Project Structure Documentation

## Root Directory Organization

The project follows Next.js 15.1.3 best practices with a `src` directory structure.

## Directory Breakdown

### App Directory (`src/app/`)

- **(auth)/** - Authentication-related routes and pages
  - Protected by authentication middleware
  - Handles login, registration, and password reset flows
- **(main)/** - Main application routes
  - Primary user interface pages
  - Protected dashboard views
  - Story creation and management interfaces
- **api/** - API route handlers
  - Backend API endpoints
  - Server-side functionality
  - API middleware

### Components Directory (`src/components/`)

- **auth/** - Authentication-specific components
  - Login forms
  - Registration forms
  - Password reset components
- **common/** - Shared components
  - Reusable UI elements
  - Layout components
  - Navigation components
- **forms/** - Form-related components
  - Input fields
  - Form validation
  - Form submission handlers
- **layout/** - Layout components
  - Page layouts
  - Navigation bars
  - Footer components
- **ui/** - UI components (ShadcN)
  - Buttons
  - Cards
  - Modals
  - Form elements

### Library Directory (`src/lib/`)

- **actions/** - Server actions
  - Database operations
  - API integrations
  - Data mutations
- **config/** - Configuration files
  - Environment variables
  - API configurations
  - Constants
- **hooks/** - Custom React hooks
  - State management hooks
  - Utility hooks
  - Feature-specific hooks
- **store/** - State management
  - Global state configurations
  - State utilities
  - Store actions
- **utils/** - Utility functions
  - Helper functions
  - Type guards
  - Formatters

### Types Directory (`src/types/`)

- **auth/** - Authentication related types
  - User interfaces
  - Authentication state types
  - Auth provider types
- **story/** - Story-related types
  - Story model interfaces
  - Story state types
  - Editor types
- **api/** - API types
  - Request/Response interfaces
  - API endpoint types
  - External service types

### Constants Directory (`src/constants/`)

- **routes.ts** - Route definitions
  - Internal route paths
  - API endpoints
  - External URLs
- **api.ts** - API endpoints
  - Endpoint URLs
  - API version constants
  - Service URLs
- **config.ts** - Application configuration
  - Feature flags
  - Environment-specific settings
  - Default values

### Testing Directory (`src/__tests__/`)

- **components/** - Component tests
  - Unit tests
  - Integration tests
  - Snapshot tests
- **hooks/** - Custom hooks tests
  - Hook behavior tests
  - State management tests
  - Side effect tests
- **utils/** - Utility function tests
  - Helper function tests
  - Type guard tests
  - Formatter tests

## **Middleware Organization**

**Main Middleware File**

- Must be located at project root or src/middleware.ts
- Handles all middleware logic centrally
- Controls execution order explicitly

**Modular Structure**

```tsx
// src/lib/middleware/auth.ts
export function authenticateRequest(request: NextRequest) {
  // Authentication logic
}

// src/lib/middleware/logging.ts
export function logRequest(request: NextRequest) {
  // Logging logic
}

// src/middleware.ts
import { authenticateRequest } from '@/lib/middleware/auth';
import { logRequest } from '@/lib/middleware/logging';

export function middleware(request: NextRequest) {
  // Execute middleware functions in controlled order
  logRequest(request);
  return authenticateRequest(request);
}
```

## **Execution Order**

Next.js middleware follows this specific order:

1. Headers from next.config.js
2. Redirects from next.config.js
3. Middleware rewrites/redirects
4. beforeFiles rewrites
5. Filesystem routes
6. afterFiles rewrites
7. Dynamic routes
8. fallback rewrites

This centralized approach ensures predictable middleware execution and prevents potential conflicts

## File Naming Conventions

- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Pages: kebab-case (e.g., `story-editor.tsx`)
- Types: PascalCase with type suffix (e.g., `UserType.ts`)
