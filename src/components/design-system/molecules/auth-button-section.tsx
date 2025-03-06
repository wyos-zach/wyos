'use client';

import * as React from 'react';
import { AuthButtons } from '@/components/ui/molecules/AuthButtons';
import { motion } from 'motion/react';

export function AuthButtonsSection() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>AuthButtons</h2>
      <p className='text-muted-foreground'>
        Premium buttons with gradients and glassmorphic effects for
        authentication actions.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthButtons
            mobile={false}
            onAction={() => setIsLoggedIn(!isLoggedIn)}
          />
        </motion.div>
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className='rounded-md bg-muted px-4 py-2 text-foreground transition-all hover:bg-muted-foreground/20'
        >
          Toggle Login State
        </button>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>mobile</code>: Toggle mobile layout (default: false)
          </li>
          <li>
            <code>onAction</code>: Callback for actions (e.g., logout)
          </li>
        </ul>
        <p>
          <strong>States:</strong> Logged Out (login/register), Logged In
          (user/logout)
        </p>
      </div>
    </section>
  );
}
