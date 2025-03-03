import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        'font-heading text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        'font-heading text-3xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        'font-heading text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, ...props }: TypographyProps) {
  return (
    <h4
      className={cn(
        'font-heading text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function P({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-base leading-7', className)} {...props}>
      {children}
    </p>
  );
}

export function Lead({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

export function Large({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </p>
  );
}

export function Small({ children, className, ...props }: TypographyProps) {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    >
      {children}
    </small>
  );
}

export function Subtle({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

export function Overline({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={cn('text-sm uppercase tracking-widest font-medium', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function GradientText({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <span className={cn('gradient-text', className)} {...props}>
      {children}
    </span>
  );
}
