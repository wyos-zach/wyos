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
import { motion } from 'motion/react';

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
        ringHover:
          'bg-[#212327] text-white transition-all duration-300 hover:ring-2 hover:ring-primary/80 hover:ring-offset-2 hover:ring-offset-background',
        glowingRing:
          'bg-[#212327] text-white relative overflow-hidden ring-2 ring-primary/50 animate-glow',
        shimmer:
          'bg-gradient-to-r from-[#212327] via-[#3a3d42] to-[#212327] bg-[length:200%_100%] text-white animate-shimmer',
        perimeterShimmer:
          'bg-[#212327] text-white relative overflow-hidden before:absolute before:inset-0 before:rounded-md before:border-2 before:border-accent/50 before:bg-transparent before:animate-perimeterShimmer',
        bouncing: 'bg-[#212327] text-white shadow animate-bounce',
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

// Regular button component
const RegularButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  }
>(
  (
    {
      className,
      disabled,
      children,
      loading,
      loadingText,
      leftIcon,
      rightIcon,
      size,
      ...props
    },
    ref
  ) => (
    <button className={className} disabled={disabled} ref={ref} {...props}>
      {loading ? (
        <>
          {size === 'icon' ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <>
              <Loader2 className='h-4 w-4 animate-spin' />
              {loadingText && <span className='ml-2'>{loadingText}</span>}
            </>
          )}
        </>
      ) : (
        <>
          {leftIcon && <span className='mr-1'>{leftIcon}</span>}
          {children}
          {rightIcon && <span className='ml-1'>{rightIcon}</span>}
        </>
      )}
    </button>
  )
);
RegularButton.displayName = 'RegularButton';

// Motion wrapper for the button
const AnimatedButton = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => (
  <motion.div
    className={className}
    whileTap={{ scale: 0.97 }}
    transition={{
      type: 'spring',
      stiffness: 500,
      damping: 30,
    }}
    {...props}
  >
    {children}
  </motion.div>
);

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
    const buttonClasses = cn(
      primaryButtonVariants({ variant, size, className }),
      'hover:shadow-[inset_0_-2px_0.5px_rgba(0,0,0,0.4),_inset_0_1px_0.5px_rgba(255,255,255,0.16),_inset_0_0_24px_6px_rgba(156,160,171,0.2)]',
      loading && 'pointer-events-none opacity-70'
    );

    // If using asChild, render with Slot
    if (asChild) {
      const slotButton = (
        <Slot
          className={buttonClasses}
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
        </Slot>
      );

      if (tooltipText) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>{slotButton}</TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return slotButton;
    }

    // Regular button with animation
    const regularButton = (
      <RegularButton
        className={buttonClasses}
        ref={ref}
        disabled={props.disabled || loading}
        loading={loading}
        loadingText={loadingText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        size={size}
        {...props}
      >
        {children}
      </RegularButton>
    );

    // Wrap in animation if not disabled
    const animatedButton =
      props.disabled || loading ? (
        regularButton
      ) : (
        <AnimatedButton className='inline-block'>
          {regularButton}
        </AnimatedButton>
      );

    if (tooltipText) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{animatedButton}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return animatedButton;
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export { PrimaryButton, primaryButtonVariants };
