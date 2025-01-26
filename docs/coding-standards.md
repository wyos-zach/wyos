coding-standards.md

## WYOS Coding Standards

### **Core Principles**

- Server-first architecture
- Type safety with TypeScript
- Performance optimization
- Accessibility compliance
- Clean code practices

## **Server Components**

### **Default Approach**

```tsx
// Default to Server Components
export default function Component({ data }: Props) {
  return <div>{data}</div>;
}
```

### Client Components

```tsx
'use client';

// Only use when component needs:
// - Interactivity (useState, useEffect)
// - Browser APIs
// - Event listeners
// - Client-side routing
export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState()}>Click</button>;
}
```

## **State Management**

### **Zustand Store Pattern**

```tsx
interface StoreState {
  data: Data | null;
  isLoading: boolean;
  error: Error | null;
}

export const useStore = create<StoreState>()(
  persist(
    immer((set) => ({
      data: null,
      isLoading: false,
      error: null,

      actions: {
        fetchData: async () => {
          set({ isLoading: true });
          try {
            // Fetch logic
          } catch (error) {
            set({ error });
          } finally {
            set({ isLoading: false });
          }
        },
      },
    })),
    {
      name: 'store-name',
    }
  )
);
```

## **Component Structure**

### **Base Component Template**

```tsx
interface ComponentProps {
  data: Data;
  onAction?: (data: Data) => void;
  className?: string;
}

export function Component({ data, onAction, className }: ComponentProps) {
  if (!data) return null;

  return (
    <div className={cn('base-styles', className)}>
      {/* Component content */}
    </div>
  );
}
```

## **Styling Guidelines**

### **Tailwind Class Order**

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
  // States
  'hover:bg-accent focus:ring-2',
  // Dynamic classes
  className
)}
```

## **Error Handling**

### **API Error Pattern**

```tsx
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    type: string;
  };
}

async function apiCall(): Promise<ApiResponse<Data>> {
  try {
    // API logic
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        type: error.name,
      },
    };
  }
}
```

## **Form Handling**

### **Form Component Pattern**

```tsx
'use client';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function FormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Form submission logic
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

## **Type Safety**

### **Type Definitions**

```tsx
// Use specific types
type Status = 'idle' | 'loading' | 'success' | 'error';

// Define clear interfaces
interface User {
  id: string;
  email: string;
  preferences: UserPreferences;
}

// Use generics when needed
function fetchData<T>(url: string): Promise<T> {
  // Fetch logic
}
```

## **Code Quality**

### **ESLint Configuration**

```json
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended"],
  "rules": {
    "no-unused-vars": "error",
    "no-console": ["error", { "allow": ["warn", "error"] }]
  }
}
```

### **Prettier Configuration**

```json
{
  "trailingComma": "es5",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 80,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## **State Management**

### **Server State Management**

```tsx
// Using TanStack Query
export function KnowledgeGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['knowledge'],
    queryFn: fetchKnowledgeItems,
    staleTime: 60 * 1000, // 1 minute
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} />;
}
```

### Form State

```tsx
// Using Zod validation
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      // Form submission logic
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
}
```

## **Accessibility Implementation**

### **Interactive Elements**

```tsx
export function NavigationButton({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md px-4 py-2',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'focus:outline-none focus:ring-2'
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

### Form Controls

```tsx
export function FormField({ label, error, ...props }: FormFieldProps) {
  const id = useId();

  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
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

### Documentation Template

```tsx
/**
 * @component KnowledgeCard
 *
 * @description
 * Displays a knowledge item with title, description, and metadata
 *
 * @example
 * <KnowledgeCard
 *   title="Getting Started"
 *   description="Learn the basics"
 *   metadata={{ publishedAt: new Date() }}
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
  it('renders content correctly', () => {
    render(<KnowledgeCard title='Test' description='Description' />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<KnowledgeCard isLoading />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});
```

### Integration Tests

```tsx
describe('Knowledge Section', () => {
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

### Assessibility Tests

```tsx
describe('Accessibility', () => {
  it('supports keyboard navigation', async () => {
    render(<NavigationMenu />);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('announces errors to screen readers', () => {
    render(<FormField error='Required field' />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });
});
```
