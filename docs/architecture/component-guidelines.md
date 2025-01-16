# component-guidelines.md

# WYOS Component Development Guidelines

## Component Architecture

### File Structure

```tsx
// ComponentName.tsx
import { type FC } from 'react'
import { cn } from '@/lib/utils'
interface ComponentNameProps {
// Props interface
}
const ComponentName: FC<ComponentNameProps> = ({ ...props }) => {
return (...)
}
export default ComponentName
```

## Component Categories

### UI Components (`components/ui/`)

- Atomic, reusable components
- Must be fully accessible
- Should use ShadcN/Radix primitives when possible
- Must include proper TypeScript types
- Should implement motion variants when using animations

### Layout Components (`components/layout/`)

- Handle page structure and composition
- Must be responsive
- Should implement proper semantic HTML
- Must handle different viewport sizes
- Should consider SSR implications

### Form Components (`components/forms/`)

- Must implement proper form validation
- Should handle loading and error states
- Must include proper ARIA attributes
- Should implement proper keyboard navigation
- Must handle form submission states

### Common Components (`components/common/`)

- Shared across multiple features
- Must be properly documented
- Should be highly reusable
- Must handle edge cases
- Should implement proper error boundaries

## Component Best Practices

### Performance

- Implement proper memoization (useMemo, useCallback)
- Avoid unnecessary re-renders
- Use proper loading states
- Implement proper error boundaries
- Use proper image optimization

### Accessibility

- Implement proper ARIA attributes
- Ensure keyboard navigation
- Maintain proper focus management
- Provide proper error messaging
- Ensure proper color contrast

### State Management

- Use proper React hooks
- Implement proper loading states
- Handle error states appropriately
- Maintain proper state initialization
- Implement proper cleanup

### TypeScript Implementation

- Use proper type definitions
- Implement proper generics when needed
- Use proper type guards
- Maintain proper type exports
- Implement proper interface segregation

### Code Style

- Use proper naming conventions
- Maintain proper file structure
- Implement proper comments
- Use proper formatting
- Follow ESLint rules

## Component Documentation Template

```tsx
/**
@component ComponentName
@description Brief description of component functionality
@props {
className?: string; // Additional classes to apply
children?: ReactNode; // Child elements
variant?: 'default' | 'primary' | 'secondary'; // Visual variant
}
@example
<ComponentName variant="primary">
Content
</ComponentName>
@accessibility
Implements ARIA role="button"
Supports keyboard navigation
Maintains focus states
@performance
Memoized callbacks
Optimized re-renders
@dependencies
@/lib/utils
framer-motion
*/
```

## Testing Requirements

- Must include unit tests
- Should include integration tests when necessary
- Must test accessibility features
- Should test error states
- Must test edge cases

---

# WYOS Component Development Guidelines

## Core Principles

- Server-first: Use Server Components by default
- Accessibility: All components must be fully accessible
- Type Safety: Strict TypeScript implementation
- Performance: Optimize for core web vitals
- Dark Mode: Design with dark theme first
- Component Composition: Build modular, reusable components that follow single responsibility principle

## Component Architecture

### Server Components (Default)

```tsx
// ComponentName.tsx
import { cn } from '@/lib/utils';
import type { ComponentProps } from '@/types';
import { ErrorBoundary } from '@/components/common';
interface ComponentNameProps extends ComponentProps {
  // Component-specific props
}
export default async function ComponentName({
  className,
  ...props
}: ComponentNameProps) {
  try {
    const data = await fetchData();
    return (
      <div className={cn('', className)} {...props}>
        {/* Component content */}
      </div>
    );
  } catch (error) {
    return <ErrorBoundary error={error} />;
  }
}
```

### Client Components (When Needed)

```tsx
// ComponentName.tsx
'use client';
import { cn } from '@/lib/utils';
import type { ComponentProps } from '@/types';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
interface ComponentNameProps extends ComponentProps {
  // Component-specific props
}
export default function ComponentName({
  className,
  ...props
}: ComponentNameProps) {
  // Add proper loading state management
  const [isLoading, setIsLoading] = useState(false);
  // Add proper error handling
  const [error, setError] = useState<Error | null>(null);
  // Add proper cleanup
  useEffect(() => {
    return () => {
      // Cleanup logic
    };
  }, []);
  if (error) {
    return <ErrorBoundary error={error} />;
  }
  return (
    <motion.div
      className={cn('', className, isLoading && 'opacity-50')}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {/* Component content */}
    </motion.div>
  );
}
```

## Component Categories

### UI Components (`components/ui/`)

- Shadcn/Radix-based components
- Pure presentational components
- Must be server components unless interactivity required
- Examples: Button, Card, Input

### Layout Components (`components/layout/`)

- Page structure components
- Must be responsive using Tailwind breakpoints
- Should implement proper semantic HTML
- Examples: Header, Footer, Sidebar

### Form Components (`components/forms/`)

- Form-specific components
- Must use proper validation
- Should handle all form states
- Examples: LoginForm, StoryForm

### Common Components (`components/common/`)

- Shared business logic components
- Must be properly documented
- Examples: StoryCard, UserAvatar

### Feature Components (`components/features/`)

- Complete feature implementations
- Composed of multiple UI components
- Handle feature-specific business logic
- Example: StoryEditor, UserDashboard

### Context Providers (`components/providers/`)

- Manage global application state
- Handle theme, authentication, etc.
- Must be Client Components
- Example: ThemeProvider, AuthProvider

### HOCs (`components/hocs/`)

- Handle cross-cutting concerns
- Enhance component functionality
- Must be documented thoroughly
- Example: withAuth, withAnalytics

## Naming Conventions

### Files and Components

- PascalCase for component files and names
- Descriptive and specific names

```tsx
// Good
UserProfileCard.tsx;
StoryEditorForm.tsx;
// Bad
Card.tsx;
Form.tsx;
```

### Functions and Handlers

```tsx
// Event Handlers
const handleClick = () => {};
const handleSubmit = async () => {};
// Computed Values
const isValidStory = useMemo(() => {}, []);
const hasEditPermission = useMemo(() => {}, []);
// Async Operations
const fetchStoryDetails = async () => {};
const updateStoryContent = async () => {};
```

## Tailwind CSS Guidelines

### Class Organization

```tsx
// Order: Layout -> Spacing -> Typography -> Visual
className={cn(
// Layout
'grid grid-cols-1 md:grid-cols-2',
// Spacing
'gap-4 p-6',
// Typography
'text-sm font-medium',
// Visual
'bg-background rounded-lg border',
// Dynamic classes
className
)}
```

### Dark Mode Implementation

```tsx
// Colors should be defined in globals.css
className = 'bg-background text-foreground';
```

## State Management

### Server State

- Implement proper caching strategies
- Use React Cache for server state
- Handle stale-while-revalidate patterns

### Optimistic Updates

- Provide immediate feedback
- Handle rollback scenarios
- Maintain data consistency

### Partial Prerendering

- Use Suspense boundaries strategically
- Implement loading states
- Handle streaming scenarios

### Loading States

```tsx
'use client';
export default function ComponentName() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={cn('relative', isLoading && 'opacity-50')}>
      {isLoading && <LoadingSpinner />}
      {/* Content */}
    </div>
  );
}
```

### Error Handling

```tsx
'use client'
export default function ComponentName() {
const [error, setError] = useState<Error | null>(null)
if (error) {
return <ErrorDisplay error={error} />
}
return (/* Content */)
}
```

## Accessibility Requirements

### Interactive Elements

```tsx
<button
type="button"
onClick={handleClick}
onKeyDown={handleKeyDown}
aria-label="Descriptive action"
tabIndex={0}
className={cn(
'focus:outline-none focus:ring-2 focus:ring-primary',
'hover:bg-accent hover:text-accent-foreground'
)}
{/* Content */}
</button>
```

### Form Inputs

````tsx
<div className="space-y-2"> <label htmlFor="inputId" className="text-sm font-medium" > Label Text </label> <input id="inputId" type="text" aria-describedby="inputDescription" className={cn( 'w-full rounded-md border', 'focus:outline-none focus:ring-2' )} /> <p id="inputDescription" className="text-xs text-muted-foreground" > Helper text </p> </div> ```
````

## **Documentation Template**

````tsx
/**
 * @component ComponentName
 *
 * @description
 * Brief description of the component's purpose and functionality.
 *
 * @example
 * ```tsx
 * <ComponentName
 *   prop1="value"
 *   prop2={123}
 * />
 * ```
 *
 * @props
 * @param {string} prop1 - Description of prop1
 * @param {number} prop2 - Description of prop2
 *
 * @accessibility
 * - Implements proper ARIA attributes
 * - Supports keyboard navigation
 * - Maintains focus management
 *
 * @performance
 * - Server component by default
 * - Optimized for dark mode
 * - Implements proper loading states
 */
````

## **Testing Requirements**

## **Unit Tests**

- Test component rendering
- Test prop variations
- Test user interactions
- Test error states

## **Integration Tests**

- Test component interactions
- Test data flow
- Test route transitions
- Test form submissions

## **Accessibility Tests**

- Test keyboard navigation
- Test screen reader compatibility
- Test color contrast
- Test ARIA attributes
