'use client';

import * as React from 'react';
import { AuthHeader } from '@/components/ui/molecules/AuthHeader';
import { motion } from 'motion/react';

export function AuthHeaderSection() {
  const [error, setError] = React.useState<string | undefined>(undefined);

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>AuthHeader</h2>
      <p className='text-muted-foreground'>
        A premium header with gradient text and subtle skeuomorphic depth for
        authentication screens.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthHeader
            title='Welcome Back'
            subtitle='Login to your account.'
            linkText='Need an account?'
            linkHref='/register'
            error={error}
          />
        </motion.div>
        <button
          onClick={() => setError(error ? undefined : 'Invalid credentials')}
          className='mt-4 rounded-md bg-muted px-4 py-2 text-foreground transition-all hover:bg-muted-foreground/20'
        >
          {error ? 'Clear Error' : 'Show Error'}
        </button>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>title</code>: Header text
          </li>
          <li>
            <code>subtitle</code>: Descriptive text
          </li>
          <li>
            <code>linkText</code>: Link text
          </li>
          <li>
            <code>linkHref</code>: Link destination
          </li>
          <li>
            <code>error</code>: Optional error message
          </li>
        </ul>
        <p>
          <strong>States:</strong> Normal (gradient text), Error (inset error
          box)
        </p>
      </div>
    </section>
  );
}
