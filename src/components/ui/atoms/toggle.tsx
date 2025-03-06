// src/components/ui/atoms/toggle.tsx
'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 gap-2 backdrop-blur-sm',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-zinc-800/70 to-zinc-900/70 border border-zinc-700/30 hover:bg-gradient-to-b hover:from-zinc-700/70 hover:to-zinc-800/70 data-[state=on]:bg-gradient-to-b data-[state=on]:from-primary/50 data-[state=on]:to-primary/30 data-[state=on]:border-primary/40 data-[state=on]:text-primary-foreground data-[state=on]:shadow-[0_0_8px_rgba(var(--primary),0.3)]',
        outline:
          'border border-zinc-600/40 bg-transparent hover:bg-zinc-800/20 data-[state=on]:bg-transparent data-[state=on]:border-primary/50 data-[state=on]:hover:bg-primary/10 data-[state=on]:shadow-[0_0_8px_rgba(var(--primary),0.3)]',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    asChild
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  >
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {props.children}
    </motion.button>
  </TogglePrimitive.Root>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
