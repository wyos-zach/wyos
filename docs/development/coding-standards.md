# **WYOS Coding Standards**

## **Server-Side Architecture**

### **Server Components**

- **Default to Server Components for all new components**
- **Only use 'use client' directive when component requires:**
  - **Interactive features (useState, useEffect)**
  - **Browser APIs**
  - **Event listeners**
  - **Client-side routing**
  - **Form submissions**

### **Data Fetching Patterns**

- Implement proper caching strategies
- Handle loading and error states appropriately
- Use proper revalidation techniques
- Follow fetch best practices:

```tsx
async function getData() {
  const res = await fetch('api/endpoint', {
    next: { revalidate: 3600 }, // Cache for 1 hour
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}
```

## **Component Architecture**

### **Component Template**

```tsx
interface ComponentProps {
  // Props interface with proper TypeScript types
  title: string;
  content: string;
  author: string;
  className?: string;
}
export function Component({
  title,
  content,
  author,
  className,
}: ComponentProps) {
  // Early returns for validation
  if (!title || !content) return null;
  return (
    <article className={cn('bg-card rounded-lg p-4', className)}>
      <h2>{title}</h2>
      <p>{content}</p>
      <span>{author}</span>
    </article>
  );
}
```

## **TypeScript Standards**

### **Type Definitions**

- Always use explicit type annotations for function parameters and returns
- Use interfaces for object shapes
- Avoid using 'any' type
- Use proper type guards for runtime checks
- Implement proper generics when needed

### **Code Organization**

- One component/feature per file
- Export types and interfaces from separate files
- Use barrel exports (index.ts) for cleaner imports
- Maintain consistent file naming conventions

## **React Best Practices**

### **Hooks Usage**

- Follow hooks naming convention: use[HookName]
- Custom hooks for reusable logic
- Proper dependency arrays in useEffect
- Memoization with useMemo and useCallback
- Proper cleanup in useEffect

### **Component Structure**

- Functional components with arrow function syntax
- Props interface defined above component
- Early returns for conditional rendering
- Props destructuring at component level
- Proper error boundaries implementation

## **Styling Guidelines**

### **Tailwind CSS**

- Use Tailwind CSS with proper variants
- Use Tailwind classes exclusively
- Use proper responsive classes
- Implement dark mode variants
- **Use proper class ordering:**
  1. **Layout (position, display, width, height)**
  2. **Spacing (margin, padding)**
  3. **Typography**
  4. **Visual (colors, backgrounds)**
  5. **Interactive states**
- Implement consistent component styling:

```tsx
const componentVariants = cva('base-styles', {
  variants: {
    intent: {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-gray-900',
    },
    size: {
      small: 'text-sm py-1 px-2',
      medium: 'text-base py-2 px-4',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});
```

### **CSS Variables**

- Use CSS variables for theme values
- Maintain consistent naming convention
- Document custom variables
- Use proper fallback values

## **Error Handling**

### **Error Boundaries**

- Implement component-level error boundaries
- Proper error logging
- User-friendly error messages
- Fallback UI components

### **Form Validation**

- Server-side validation
- Client-side validation
- Proper error messaging
- Accessibility considerations

## **Performance Guidelines**

- Implement proper loading states
- Use proper image optimization with next/image
- Implement proper error boundaries
- Handle edge cases appropriately

### **Optimization**

- Proper code splitting
- Image optimization
- Lazy loading implementation
- Bundle size monitoring
- Performance metrics tracking

### **State Management**

- Proper state initialization
- Controlled vs Uncontrolled components
- Global state management
- Local state optimization

## **Code Quality**

### **ESLint Rules**

- No unused variables
- No console logs in production
- Proper TypeScript checks
- Accessibility rules
- Import ordering

### **Prettier Configuration**

- Single quotes
- 2 space indentation
- Semicolons required
- Trailing commas
- Max line length: 80 characters

## Server Actions

```tsx
// Add section for Server Actions usage
'use server';

async function submitForm(formData: FormData) {
  // Validation
  if (!formData.get('email')) {
    throw new Error('Email is required');
  }

  // Processing
  try {
    // Action logic
  } catch (error) {
    // Error handling
  }
}
```

## Route Handlers

```tsx
// Add section for Server Actions usage
'use server';

async function submitForm(formData: FormData) {
  // Validation
  if (!formData.get('email')) {
    throw new Error('Email is required');
  }

  // Processing
  try {
    // Action logic
  } catch (error) {
    // Error handling
  }
}
```

## Metadata

```tsx
// Add section for metadata handling
export const metadata = {
  title: {
    template: '%s | WYOS',
    default: 'WYOS - Write Your Own Story',
  },
  description: 'Write and share your stories',
};
```
