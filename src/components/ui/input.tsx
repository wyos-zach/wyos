'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    if (label) {
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
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive',
              className
            )}
            ref={ref}
            id={inputId}
            placeholder=''
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

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
