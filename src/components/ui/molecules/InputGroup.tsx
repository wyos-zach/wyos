'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from '@/components/ui/atoms/input';

export interface InputGroupProps {
  children: React.ReactElement<InputProps>;
  icon: React.ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export const InputGroup = ({
  children,
  icon,
  position = 'left',
  className,
}: InputGroupProps) => {
  return (
    <div
      className={cn(
        'flex items-center rounded-lg border border-zinc-700/20 bg-zinc-900/30 shadow-sm backdrop-blur-md',
        'transition-colors duration-200 hover:bg-zinc-800/40',
        className
      )}
    >
      {position === 'left' && (
        <span className='flex items-center px-3 text-zinc-400'>{icon}</span>
      )}
      {React.cloneElement(children, {
        ...children.props,
        className: cn(
          children.props.className,
          'border-none bg-transparent w-full h-10 py-2 text-sm placeholder:text-zinc-500',
          position === 'left' ? 'pl-0' : 'pr-0',
          'focus-visible:outline-none focus-visible:ring-0 focus:outline-none' // Triple-check no focus styles
        ),
      })}
      {position === 'right' && (
        <span className='flex items-center px-3 text-zinc-400'>{icon}</span>
      )}
    </div>
  );
};

InputGroup.displayName = 'InputGroup';
