'use client';

import * as React from 'react';
import { AuthFields } from '@/components/ui/molecules/AuthFields';
import { motion } from 'motion/react';

export function AuthFieldsSection() {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>AuthFields</h2>
      <p className='text-muted-foreground'>
        Sleek, skeuomorphic input fields with glassmorphic styling for login and
        registration.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthFields type={type} isLoading={false} />
        </motion.div>
        <button
          onClick={() => setType(type === 'login' ? 'register' : 'login')}
          className='rounded-md bg-muted px-4 py-2 text-foreground transition-all hover:bg-muted-foreground/20'
        >
          Switch to {type === 'login' ? 'Register' : 'Login'}
        </button>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>type</code>: "login" or "register"
          </li>
          <li>
            <code>isLoading</code>: Disable inputs when loading
          </li>
        </ul>
        <p>
          <strong>States:</strong> Login (email/password), Register
          (name/email/password)
        </p>
      </div>
    </section>
  );
}
