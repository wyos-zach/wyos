'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('button-base', {
  variants: {
    variant: {
      default: 'button-default',
      secondary: 'button-secondary',
      outline: 'button-outline',
      ghost: 'button-ghost',
    },
    size: {
      default: '',
      sm: 'text-xs px-4 py-1.5',
      lg: 'text-base px-6 py-3',
      icon: 'h-10 w-10 p-0',
      'icon-sm': 'h-7 w-7 p-0',
      'icon-lg': 'h-12 w-12 p-0',
      'icon-xl': 'h-16 w-16 p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
