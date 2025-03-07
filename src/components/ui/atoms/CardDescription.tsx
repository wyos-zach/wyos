'use client';

import { cn } from '@/lib/utils';

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = ({
  children,
  className,
}: CardDescriptionProps) => {
  return (
    <p className={cn('line-clamp-2 text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};
