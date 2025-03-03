'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const primaryButtonVariants = cva(
  // Base styles that apply to all variants
  'inline-flex items-center justify-center gap-2 rounded-md text-white text-center text-sm font-medium leading-6 transition-all duration-400 ease-[cubic-bezier(0.6,0.6,0,1)] shadow-[inset_0_-2px_0.5px_rgba(0,0,0,0.4),_inset_0_1px_0.5px_rgba(255,255,255,0.16)]',
  {
    variants: {
      variant: {
        default: 'bg-[#212327]',
        destructive: 'bg-destructive text-destructive-foreground',
        outline:
          'border border-input bg-background text-foreground hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost: 'shadow-none hover:bg-accent',
        link: 'text-primary underline-offset-4 shadow-none hover:underline',
      },
      size: {
        default: 'px-5 py-2',
        sm: 'px-3 py-1.5 text-xs',
        lg: 'px-6 py-3 text-base',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof primaryButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  tooltipText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      tooltipText,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const buttonContent = (
      <Comp
        className={cn(
          primaryButtonVariants({ variant, size, className }),
          'hover:shadow-[inset_0_-2px_0.5px_rgba(0,0,0,0.4),_inset_0_1px_0.5px_rgba(255,255,255,0.16),_inset_0_0_24px_6px_rgba(156,160,171,0.2)]',
          loading && 'pointer-events-none opacity-70'
        )}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span className='mr-1'>{leftIcon}</span>}
            {children}
            {rightIcon && <span className='ml-1'>{rightIcon}</span>}
          </>
        )}
      </Comp>
    );

    if (tooltipText) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return buttonContent;
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export { PrimaryButton, primaryButtonVariants };
