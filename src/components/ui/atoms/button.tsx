// src/components/ui/atoms/button.tsx
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
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-colors duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)] shadow-inset-custom rounded-md',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-inset-custom rounded-md',
        outline:
          'border border-input bg-background hover:bg-secondary hover:text-secondary-foreground shadow-inset-custom rounded-md',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-inset-custom rounded-md',
        ghost:
          'bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground border-none shadow-none rounded-none p-1', // Explicit overrides
        link: 'bg-transparent text-primary underline-offset-4 hover:underline hover:text-primary/80 border-none shadow-none rounded-none p-0 h-auto leading-none', // Explicit overrides
        glowingRing:
          'bg-[var(--button-bg)] text-[var(--button-text)] relative overflow-hidden ring-2 ring-primary/50 animate-glow shadow-inset-custom rounded-md',
        shimmer:
          'bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 bg-[length:200%_100%] bg-[var(--button-bg)] text-[var(--button-text)] animate-shimmer shadow-inset-custom rounded-md',
        perimeterShimmer:
          'bg-[var(--button-bg)] text-[var(--button-text)] relative overflow-hidden before:absolute before:inset-0 before:rounded-md before:border-2 before:border-accent/50 before:bg-transparent before:animate-perimeterShimmer shadow-inset-custom rounded-md',
        hoverGlow:
          'bg-gradient-to-b from-gray-700 to-gray-800 text-white border border-gray-600/40 backdrop-blur-sm shadow-sm rounded-md',
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
            ? '0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)'
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

    const content = (
      <motion.span
        key={loading ? 'loading' : 'content'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='flex items-center space-x-2' // Explicit flex for inline alignment
      >
        {loading ? (
          size === 'icon' ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <>
              <span className='leading-none'>{loadingText}</span>
              <Loader2 className='h-4 w-4 animate-spin' />
            </>
          )
        ) : (
          children
        )}
      </motion.span>
    );

    return tooltipText ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              ref={ref}
              disabled={loading}
              className={cn(buttonVariants({ variant, size }), className)}
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
