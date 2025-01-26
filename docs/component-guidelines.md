component-guidelines.md

## WYOS Component Development Guidelines

### **Core Principles**

- Server-first: Use Server Components by default
- Accessibility: All components must be fully accessible
- Type Safety: Strict TypeScript implementation
- Performance: Optimize for core web vitals
- Dark Mode: Design with dark theme first
- Component Composition: Build modular, reusable components

## **Component Architecture**

### **Server Components (Default)**

```tsx
// ComponentName.tsx
import { cn } from '@/lib/utils';
import type { ComponentProps } from '@/types';
import { ErrorBoundary } from '@/components/shared';

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

**Client Components (When Needed)**

```tsx
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

## **Component Categories**

### **UI Components (`components/ui/`)**

- Atomic, reusable components
- Must be fully accessible
- Should use ShadcN/Radix primitives
- Must include proper TypeScript types

### **Layout Components (`components/layout/`)**

- Handle page structure and composition
- Must be responsive using Tailwind breakpoints
- Should implement proper semantic HTML
- Must handle different viewport sizes

### **Form Components (`components/forms/`)**

- Must implement proper form validation
- Should handle loading and error states
- Must include proper ARIA attributes
- Should implement proper keyboard navigation

### **Shared Components (`components/shared/`)**

- Shared across multiple features
- Must be properly documented
- Should be highly reusable
- Must handle edge cases

## **Naming Conventions**

### **Files and Components**

```tsx
// Good
UserProfileCard.tsx;
StoryEditorForm.tsx;

// Bad
Card.tsx;
Form.tsx;
```

### **Functions and Handlers**

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

## **Tailwind CSS Guidelines**

### **Class Organization**

```tsx
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

## **State Management**

### **Server State**

```tsx
// Using React Query for server state
export function KnowledgeList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['knowledge'],
    queryFn: fetchKnowledgeItems,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className='grid gap-4'>
      {data.map((item) => (
        <KnowledgeCard key={item.id} {...item} />
      ))}
    </div>
  );
}
```

### **Client State**

```tsx
'use client';

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleCategoryChange = async (category: string) => {
    setIsFiltering(true);
    setSelectedCategory(category);
    setIsFiltering(false);
  };

  return (
    <div className={cn('relative', isFiltering && 'opacity-50')}>
      {/* Filter content */}
    </div>
  );
}
```

## **Accessibility Implementation**

### **Interactive Elements**

```tsx
export function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md px-4 py-2',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'focus:ring-primary focus:outline-none focus:ring-2'
      )}
      aria-label={label}
      role='button'
      tabIndex={0}
    >
      {label}
    </button>
  );
}
```

### **Form Controls**

```tsx
export function FormInput({ label, error, ...props }: FormInputProps) {
  const id = useId();

  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(error && 'border-destructive')}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className='text-destructive text-sm'>
          {error}
        </p>
      )}
    </div>
  );
}
```

## **Error Handling**

### **Component Error Boundaries**

```tsx
'use client';

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className='bg-destructive/10 rounded-md p-4'>
      <div className='text-destructive flex items-center gap-2'>
        <AlertCircle className='h-4 w-4' />
        <h2 className='font-semibold'>Something went wrong</h2>
      </div>
      <p className='text-muted-foreground mt-2 text-sm'>{error.message}</p>
    </div>
  );
}
```

### **Loading States**

```tsx
export function LoadingState() {
  return (
    <div className='flex items-center justify-center p-8'>
      <div className='w-full max-w-md space-y-4'>
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='h-32' />
        <Skeleton className='h-8 w-1/2' />
      </div>
    </div>
  );
}
```

### **Documentation Template**

```tsx
/**
 * @component KnowledgeCard
 *
 * @description
 * Displays a knowledge item with title, description, and category.
 *
 * @example
 * <KnowledgeCard
 *   title="Getting Started"
 *   description="Learn the basics"
 *   category="Fundamentals"
 * />
 *
 * @accessibility
 * - Uses semantic HTML
 * - Includes proper ARIA labels
 * - Supports keyboard navigation
 *
 * @performance
 * - Implements proper loading states
 * - Uses optimized images
 * - Handles error boundaries
 */
```

## **Testing Requirements**

### **Unit Tests**

```tsx
describe('KnowledgeCard', () => {
  it('renders title and description', () => {
    render(<KnowledgeCard title='Test' description='Description' />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<KnowledgeCard isLoading />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});
```

### **Integration Tests**

```tsx
describe('KnowledgeList with filters', () => {
  it('filters content when category is selected', async () => {
    render(
      <>
        <CategoryFilter />
        <KnowledgeList />
      </>
    );

    await userEvent.click(screen.getByText('Category 1'));
    expect(await screen.findByText('Filtered Content')).toBeInTheDocument();
  });
});
```
