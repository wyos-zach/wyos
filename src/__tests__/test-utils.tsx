import React from 'react';
import type { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { QueryProvider } from '@/lib/providers/query-provider';

/**
 * Provides all necessary providers for testing components
 * @param {React.ReactNode} children - The components to be wrapped
 * @returns {JSX.Element} The wrapped components
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

/**
 * Custom render function that wraps the UI in the necessary providers
 * Use this instead of the standard render function from @testing-library/react
 * @param {ReactElement} ui - The component to render
 * @param {RenderOptions} options - Additional render options
 * @returns The rendered component with all testing utilities
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything except render from testing-library
// skipcq: JS-E1004
export * from '@testing-library/react';
// skipcq: JS-E1004
export { customRender as render };
