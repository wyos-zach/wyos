'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputAnimationProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

const InputAnimation = React.forwardRef<HTMLInputElement, InputAnimationProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className='group relative w-full'>
        <label
          htmlFor={inputId}
          className={cn(
            'origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm',
            'text-muted-foreground/70 transition-all',
            'group-focus-within:pointer-events-none group-focus-within:top-0',
            'group-focus-within:cursor-default group-focus-within:text-xs',
            'group-focus-within:font-medium group-focus-within:text-foreground',
            'has-[+input:not(:placeholder-shown)]:pointer-events-none',
            'has-[+input:not(:placeholder-shown)]:top-0',
            'has-[+input:not(:placeholder-shown)]:cursor-default',
            'has-[+input:not(:placeholder-shown)]:text-xs',
            'has-[+input:not(:placeholder-shown)]:font-medium',
            'has-[+input:not(:placeholder-shown)]:text-foreground',
            error && 'text-destructive'
          )}
        >
          <span className='inline-flex bg-background px-2'>{label}</span>
        </label>
        <Input
          ref={ref}
          id={inputId}
          placeholder=''
          className={cn(error && 'border-destructive', className)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <span
            id={`${inputId}-error`}
            className='mt-1 text-xs text-destructive'
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputAnimation.displayName = 'InputAnimation';

export { InputAnimation };
