import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  fluid?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = 'div', fluid = false, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full',
          fluid ? 'px-4' : 'container px-4 md:px-6',
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container };
