import '@testing-library/jest-dom';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
    params: {},
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Add any global test setup or teardown here
