'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'aside' | 'div';
  container?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'none' | 'primary' | 'secondary' | 'gradient';
}

const backgroundVariants = {
  none: '',
  primary: 'bg-background',
  secondary: 'bg-secondary/5',
  gradient: [
    'relative',
    'before:absolute before:inset-0',
    'before:bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]',
  ].join(' '),
};

const spacingVariants = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
};

export function Section({
  as: Component = 'section',
  container = true,
  spacing = 'md',
  background = 'none',
  className,
  children,
  ...props
}: SectionProps) {
  const content = (
    <Component
      className={cn(
        backgroundVariants[background],
        spacingVariants[spacing],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );

  if (container) {
    return <Container>{content}</Container>;
  }

  return content;
}
