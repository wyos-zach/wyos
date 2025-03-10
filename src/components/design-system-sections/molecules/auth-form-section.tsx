'use client';

import { AuthForm } from '@/components/design-system/molecules/AuthForm';
import { motion } from 'motion/react';
import * as React from 'react';

export function AuthFormSection() {
  const [formState, setFormState] = React.useState<
    'normal' | 'success' | 'error'
  >('normal');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('success');
  };

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>AuthForm</h2>
      <p className='text-muted-foreground'>
        A versatile, glassmorphic form with skeuomorphic inputs for
        authentication flows.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthForm
            type='forgot-password'
            title='Reset Password'
            description='Enter your email to reset your password.'
            fields={[
              {
                id: 'email',
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'you@example.com',
                required: true,
              },
            ]}
            onSubmit={handleSubmit}
            buttonText='Send Reset Link'
            successMessage={
              formState === 'success'
                ? 'Check your email for a reset link.'
                : undefined
            }
            errorMessage={
              formState === 'error' ? 'Something went wrong.' : undefined
            }
            isLoading={false}
            linkText='Back to login'
            linkHref='/login'
          />
        </motion.div>
        <div className='flex gap-2'>
          <button
            onClick={() => setFormState('error')}
            className='rounded-md bg-muted px-4 py-2 text-foreground transition-all hover:bg-muted-foreground/20'
          >
            Show Error
          </button>
          <button
            onClick={() => setFormState('normal')}
            className='rounded-md bg-muted px-4 py-2 text-foreground transition-all hover:bg-muted-foreground/20'
          >
            Reset
          </button>
        </div>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>type</code>: Form type (e.g., "forgot-password")
          </li>
          <li>
            <code>title</code>: Form title
          </li>
          <li>
            <code>description</code>: Form description
          </li>
          <li>
            <code>fields</code>: Array of input fields
          </li>
          <li>
            <code>onSubmit</code>: Form submission handler
          </li>
          <li>
            <code>buttonText</code>: Button text
          </li>
          <li>
            <code>successMessage</code>: Success message
          </li>
          <li>
            <code>errorMessage</code>: Error message
          </li>
          <li>
            <code>isLoading</code>: Loading state
          </li>
          <li>
            <code>linkText</code>: Link text
          </li>
          <li>
            <code>linkHref</code>: Link destination
          </li>
        </ul>
        <p>
          <strong>States:</strong> Normal (inputs), Success (message), Error
          (alert), Loading (disabled)
        </p>
      </div>
    </section>
  );
}
