import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2', // for grid-gap
    'text-white text-center text-[14px] font-medium leading-[28px] tracking-[-.18px]',
    'bg-[rgb(29,41,57)] rounded-lg',
    'px-5 py-2', // 20px and 8px padding
    'shadow-[inset_0_-2px_0.5px_rgba(0,0,0,0.4),_inset_0_1px_0.5px_rgba(255,255,255,0.16)]',
    'transition-all duration-400 ease-[cubic-bezier(0.6,0.6,0,1)]',

    // Hover effects for premium feel
    'hover:bg-[rgb(39,51,67)]', // Slightly lighter
    'hover:transform hover:scale-[1.02]',
    'hover:shadow-[inset_0_-2px_0.5px_rgba(0,0,0,0.4),_inset_0_1px_0.5px_rgba(255,255,255,0.16),_0_4px_10px_rgba(0,0,0,0.1)]',

    // Active/Press effect
    'active:transform active:scale-[0.98]',
    'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]',

    // Focus state
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(29,41,57)]',

    // Disabled state
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        // You can add other variants here if needed
        secondary:
          'bg-white text-[rgb(29,41,57)] border border-[rgb(29,41,57)]',
        outline:
          'bg-transparent text-[rgb(29,41,57)] border border-[rgb(29,41,57)]',
      },
      size: {
        default: '',
        sm: 'text-xs px-4 py-1.5',
        lg: 'text-base px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

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
