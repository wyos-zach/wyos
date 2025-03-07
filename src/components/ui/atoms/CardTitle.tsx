'use client';

import { cn } from '@/lib/utils';

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <h3
      className={cn(
        'gradient-text mb-2 font-heading text-2xl font-bold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  );
};
