# WYOS Development Guidelines

## Project Overview

1. **Framework**: Next.js 15 with App Router.
2. **Language**: TypeScript (strict).
3. **Core Libraries**:
   - UI Framework: Tailwind CSS with ShadcN components and Motion (motion/react) for animations.
   - State Management: Zustand (client state) and TanStack Query (server state).
   - Validation: Zod.
   - Backend: Appwrite for authentication and database services.

### Code Standards

1. Default to **Server Components** unless `'use client'` is explicitly required.
2. Always use **TypeScript in strict mode**.
3. Follow ESLint and Prettier configurations specified in the workspace.
4. Always validate props using TypeScript interfaces or utility types (e.g., `Pick`, `Omit`).
5. Enforce modular and reusable components:
   - Include loading, error, and empty states for all components.
   - Document all exported components with examples and accessibility notes.
6. Modular, readable, and maintainable code should follow clear separation of concerns (e.g., logic, UI, and state management should be isolated in respective files).
7. Centralize error-handling logic with reusable utility functions or hooks, ensuring consistent API response handling.
8. Follow SOLID principles.

## Build/Test/Lint Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build the Next.js application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Code Style Guidelines

- **Formatting**: Uses Prettier with 2-space indentation, 80-char line length
- **Components**: PascalCase for components, kebab-case for files/directories
- **Naming**: camelCase for variables/functions, prefix hooks with "use"
- **Types**: Prefer explicit typing, avoid any, use TypeScript's import type syntax
- **React**: Server Components first, Client Components when necessary
- **State**: Use Zustand with Immer for state management
- **Data Fetching**: TanStack Query for server data
- **Imports**: Group by external/internal, use path aliases
- **Error Handling**: Proper boundaries, consistent error patterns
- **Styling**: Tailwind classes organized by category, cn utility for merging

## Folder and File Management

1. Follow the modular structure defined for WYOS:

   ```md
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

2. Keep feature-specific logic self-contained (e.g., `knowledge`, `resources`).
3. Do not modify files in `/node_modules/` or critical folders without explicit approval.
4. Maintain modular, feature-based folder structures (`src/app/`, `src/components/`).

## State Management

1. Use **Zustand** for client-side state management with immer and persist middleware.
   - Use **immer** for immutable state updates.
   - Persist state (e.g., authentication, preferences) using `zustand/persist` middleware.
2. Use **TanStack Query** for server-side state management with caching and hydration.
   - Define query keys and stale times for consistency (e.g., `['knowledge']`, `['resources']`).
   - Define query keys with descriptive names based on features and parameters (e.g., ['knowledge', { category: 'productivity' }]).

## API Usage

1. Always follow the API response structure: `{ success, error, data }`.
2. Use Appwrite’s SDK for authentication and database queries.
3. Avoid hardcoding API endpoints; reference them from the `src/lib/config` directory.
4. Avoid using experimental or deprecated APIs unless explicitly instructed.

## Accessibility

1. Ensure all interactive elements include:
   - ARIA attributes.
   - Keyboard navigation support.
   - Proper focus-visible styles.

## Security and Validation

1. Use **Zod** for input validation across forms and API calls.
2. Sanitize user-generated content using `DOMPurify`.
3. Store sensitive credentials securely using environment variables.

## Performance Optimization

1. Always prioritize performance in code:
   - Use lazy loading for components and assets where applicable.
   - Optimize server-side rendering for large datasets or components using streaming or pagination.
   - Minimize re-renders by memoizing expensive computations and callback functions.
   - Avoid inline functions in JSX to reduce unnecessary re-renders.

## Testing

1. Include integration tests for workflows like:
   - User authentication.
   - Knowledge/resource filtering.
   - Form submissions.
2. Ensure all new features are tested for accessibility, performance, and edge cases.

## Documentation

1. Provide JSDoc-style comments for all public functions and components.
2. Maintain a `README.md` file in each feature folder explaining:
   - The purpose of the feature.
   - How to test it.
   - Key dependencies.

## General Interaction Guidelines

- Ask for clarification when uncertain about a task
- Avoid making assumptions, implementing changes, or creating new features without full understanding of what's already been configured.
- Avoid generating code that is not directly related to the task at hand.
- Ensure all AI-generated code is:
  - Well-documented with clear comments.
  - Modular, readable, and maintainable.
  - Free of bugs and errors.

When debugging, only make code changes if you are certain that you can solve the problem.
Otherwise, follow debugging best practices:

- Address the root cause instead of the symptoms.
- Add descriptive logging statements and error messages to track variable and code state.
- Add test functions and statements to isolate the problem.

This file provides essential guidelines for agentic coding assistants working in this repository.
