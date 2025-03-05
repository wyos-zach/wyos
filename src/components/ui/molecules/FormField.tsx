// src/components/molecules/FormField.tsx
'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import { Label } from '@/components/ui/atoms/label'; // Your atom
import { cn } from '@/lib/utils';

// Define props for the child component (e.g., TextInput, Checkbox)
interface ChildInputProps {
  id?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional props
}

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactElement<ChildInputProps>; // Narrow children to ReactElement
  error?: string;
  className?: string;
}

// Forward ref to HTMLInputElement (common for TextInput, Checkbox)
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, htmlFor, children, error, className }, ref) => {
    // Ensure children is a single ReactElement
    if (!React.isValidElement(children)) {
      throw new Error('FormField expects a single ReactElement as its child.');
    }

    return (
      <div
        className={cn(
          'space-y-2 rounded-lg border border-zinc-700/30 bg-zinc-900/40 p-4 shadow-sm backdrop-blur-md',
          error && 'border-destructive/50 bg-destructive/10',
          className
        )}
      >
        <Label
          htmlFor={htmlFor}
          className={cn(
            'text-sm font-medium text-zinc-100',
            error && 'text-destructive'
          )}
        >
          {label}
        </Label>
        <motion.div
          initial={{ scale: 1 }}
          whileFocus={{
            scale: 1.01,
            boxShadow: '0 0 8px rgba(59,130,246,0.2)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {React.cloneElement(children, {
            ref, // Forward ref to the child
            id: htmlFor,
            className: cn(
              children.props.className, // Safely access props
              error && 'border-destructive focus-visible:ring-destructive'
            ),
            'aria-invalid': !!error,
          })}
        </motion.div>
        {error && (
          <p className='text-xs font-medium text-destructive'>{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
