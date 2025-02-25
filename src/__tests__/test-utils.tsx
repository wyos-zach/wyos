import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Add here any providers that you want to wrap your components with during testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

/**
 * Custom render function that wraps the UI in the necessary providers
 * Use this instead of the standard render function from @testing-library/react
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { customRender as render };