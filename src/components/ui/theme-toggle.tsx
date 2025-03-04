'use client';

import { Toggle } from '@/components/ui/toggle';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  theme: string;
  onThemeChangeAction: (theme: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ThemeToggle({
  theme,
  onThemeChangeAction,
  size = 'md',
  className,
}: ThemeToggleProps) {
  const sizeClasses = {
    sm: 'size-8',
    md: 'size-9',
    lg: 'size-10',
  };

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <Toggle
      variant='outline'
      className={cn(
        'group data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted',
        sizeClasses[size],
        className
      )}
      pressed={theme === 'dark'}
      onPressedChange={() =>
        onThemeChangeAction(theme === 'dark' ? 'light' : 'dark')
      }
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Moon
        size={iconSize[size]}
        strokeWidth={2}
        className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
        aria-hidden='true'
      />
      <Sun
        size={iconSize[size]}
        strokeWidth={2}
        className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
        aria-hidden='true'
      />
    </Toggle>
  );
}
