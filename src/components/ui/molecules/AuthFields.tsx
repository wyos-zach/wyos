'use client';

import { motion } from 'motion/react';
import { InputAnimation } from '@/components/ui/input-with-label-animation';
import { cn } from '@/lib/utils';

interface AuthFieldsProps {
  type: 'login' | 'register';
  isLoading: boolean;
}

export function AuthFields({ type, isLoading }: AuthFieldsProps) {
  const baseInputClasses = cn(
    'bg-[rgba(255,255,255,0.05)] backdrop-blur-sm', // Glass-like background
    'border border-[rgba(255,255,255,0.1)] focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--ring))]', // Subtle border with theme focus
    'placeholder:text-muted-foreground text-foreground', // Theme-consistent text
    'shadow-inset-custom rounded-md p-3', // Skeuomorphic inset shadow
    'transition-all duration-300', // Smooth transitions
    'disabled:opacity-50' // Disabled state
  );

  const fields =
    type === 'login'
      ? [
          {
            label: 'Email',
            name: 'email',
            type: 'email',
            required: true,
            autoComplete: 'email',
          },
          {
            label: 'Password',
            name: 'password',
            type: 'password',
            required: true,
            autoComplete: 'current-password',
          },
        ]
      : [
          {
            label: 'First Name',
            name: 'firstname',
            type: 'text',
            required: true,
            autoComplete: 'given-name',
          },
          {
            label: 'Last Name',
            name: 'lastname',
            type: 'text',
            required: true,
            autoComplete: 'family-name',
          },
          {
            label: 'Email',
            name: 'email',
            type: 'email',
            required: true,
            autoComplete: 'email',
          },
          {
            label: 'Password',
            name: 'password',
            type: 'password',
            required: true,
            autoComplete: 'new-password',
          },
        ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('space-y-6', type === 'register' && 'max-w-lg')}
    >
      {type === 'register' && (
        <div className='grid grid-cols-2 gap-4'>
          {fields.slice(0, 2).map((field) => (
            <InputAnimation
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              disabled={isLoading}
              className={baseInputClasses}
              required={!!field.required}
              autoComplete={field.autoComplete}
            />
          ))}
        </div>
      )}
      {fields.slice(type === 'register' ? 2 : 0).map((field) => (
        <InputAnimation
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          disabled={isLoading}
          className={baseInputClasses}
          required={!!field.required}
          autoComplete={field.autoComplete}
        />
      ))}
    </motion.div>
  );
}

// Usage:
// <AuthFields type="login" isLoading={false} />
// <AuthFields type="register" isLoading={false} />
