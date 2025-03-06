// src/components/ui/atoms/label.tsx
'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-60 transition-all duration-200 bg-gradient-to-r from-foreground/90 to-foreground inline-block bg-clip-text text-transparent',
  {
    variants: {
      variant: {
        default: '',
        required:
          'after:content-["*"] after:ml-1 after:text-transparent after:bg-gradient-to-r after:from-red-400 after:to-red-600 after:bg-clip-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    asChild
    className={cn(
      labelVariants({ variant: required ? 'required' : variant }),
      className
    )}
    {...props}
  >
    <motion.span
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {props.children}
    </motion.span>
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
