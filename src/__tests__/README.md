# WYOS Testing Guide

## Test Setup

The WYOS project uses Jest and React Testing Library for testing. This setup enables unit and integration testing for components, hooks, and utilities.

### Test Structure

- `src/__tests__/` - Contains global test setup and utilities
  - `setup.test.ts` - Basic setup verification tests
  - `jest.setup.ts` - Jest configuration for all tests
  - `test-utils.tsx` - Custom render method and helper functions

### Writing Tests

#### Component Tests

Place component tests in the same directory as the component, using the `.test.tsx` suffix.

Example:
```tsx
// src/components/MyComponent.test.tsx
import { render, screen } from '@/__tests__/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

#### Mocking

Use Jest's mocking capabilities to mock dependencies:

```tsx
// Mock a component or module
jest.mock('@/components/SomeComponent', () => ({
  SomeComponent: () => <div data-testid="mocked-component">Mocked</div>
}));

// Mock a hook
jest.mock('@/lib/hooks/useMyHook', () => ({
  useMyHook: () => ({ data: 'test', isLoading: false })
}));
```

### Running Tests

- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report

### Best Practices

1. Test behavior, not implementation details
2. Use data-testid attributes for test-specific selectors
3. Mock external dependencies and API calls
4. Use the custom render function from `test-utils.tsx` to include providers
5. Write focused, small tests that test one thing at a time