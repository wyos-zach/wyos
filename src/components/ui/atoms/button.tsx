// src/components/ui/button.tsx
'use client';

import { Slot } from '@radix-ui/react-slot';
import { Tooltip } from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { motion, type MotionProps } from 'motion/react';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-inset-custom',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--button-bg)] text-[var(--button-text)] hover:dark-bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-secondary hover:text-secondary-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-secondary hover:text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        ringHover:
          'bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-primary/90 hover:ring-2 hover:ring-primary/80 hover:ring-offset-2 hover:ring-offset-background',
        glowingRing:
          'bg-[var(--button-bg)] text-[var(--button-text)] relative overflow-hidden ring-2 ring-primary/50 animate-glow',
        shimmer:
          'bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] bg-[var(--button-bg)] text-[var(--button-text)] animate-shimmer',
        perimeterShimmer:
          'bg-[var(--button-bg)] text-[var(--button-text)] relative overflow-hidden before:absolute before:inset-0 before:rounded-md before:border-2 before:border-accent/50 before:bg-transparent before:animate-perimeterShimmer',
        bouncing:
          'bg-[var(--button-bg)] text-[var(--button-text)] shadow hover:dark-bg-primary/90 animate-bounce',
        hoverGlow:
          'bg-gradient-to-b from-primary/80 to-primary/60 text-white border border-primary/40 backdrop-blur-sm shadow-sm',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  tooltipText?: string;
}

type MotionButtonProps = MotionProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      loadingText = 'Processing...',
      tooltipText,
      children,
      ...props
    },
    ref
  ) => {
    const animationProps: MotionProps = {
      whileHover: {
        scale: 1.02,
        boxShadow:
          variant === 'hoverGlow'
            ? '0 0 5px rgba(52, 211, 153, 0.5), 0 0 10px rgba(52, 211, 153, 0.8)' // Subtle glow on hover
            : 'inset 0 -2px 0.5px rgba(0,0,0,0.4), inset 0 1px 0.5px rgba(255,255,255,0.16), inset 0 0 24px 6px rgba(156,160,171,0.2)',
      },
      whileTap: { scale: 0.98 },
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20,
      },
    };

    const Comp = asChild ? Slot : motion.button;

    const content = loading ? (
      <>
        {size === 'icon' ? (
          <Loader2 className='h-4 w-4 animate-spin' />
        ) : (
          <>
            {loadingText}
            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
          </>
        )}
      </>
    ) : (
      children
    );

    return tooltipText ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              ref={ref}
              disabled={loading}
              className={cn(buttonVariants({ variant, size }), className)}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(asChild ? (props as any) : (props as MotionButtonProps))}
              {...(!loading ? animationProps : {})}
            >
              {content}
            </Comp>
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Comp
        ref={ref}
        disabled={loading}
        className={cn(buttonVariants({ variant, size }), className)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(asChild ? (props as any) : (props as MotionButtonProps))}
        {...(!loading ? animationProps : {})}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
