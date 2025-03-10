import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded px-2 py-1 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-primary/10 to-background/80 text-foreground border border-primary/20 backdrop-blur-sm shadow-[0_1px_2px_rgba(255,255,255,0.1)]',
        secondary:
          'bg-gradient-to-br from-secondary/10 to-background/80 text-secondary-foreground border border-secondary/20 backdrop-blur-sm shadow-[0_1px_2px_rgba(255,255,255,0.1)]',
        destructive:
          'bg-gradient-to-br from-destructive/10 to-background/80 text-destructive-foreground border border-destructive/20 backdrop-blur-sm shadow-[0_1px_2px_rgba(255,255,255,0.1)]',
        outline:
          'bg-transparent text-foreground border border-border/50 backdrop-blur-sm shadow-[0_1px_1px_rgba(0,0,0,0.05)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
