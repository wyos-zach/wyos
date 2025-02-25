import React from 'react';
import type { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

// Add here any providers that you want to wrap your components with during testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

/**
 * Custom render function that wraps the UI in the necessary providers
 * Use this instead of the standard render function from @testing-library/react
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
