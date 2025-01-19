import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = 'div', size = 'xl', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 md:px-6 lg:px-8',
          {
            'max-w-screen-sm': size === 'sm',
            'max-w-screen-md': size === 'md',
            'max-w-screen-lg': size === 'lg',
            'max-w-screen-xl': size === 'xl',
            'max-w-none': size === 'full',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container };
