'use client';

import * as React from 'react';
import { SocialAuth } from '@/components/ui/molecules/SocialAuth';
import { motion } from 'motion/react';

export function SocialAuthSection() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>SocialAuth</h2>
      <p className='text-muted-foreground'>
        Premium social login buttons with glassmorphic styling and subtle
        gradients.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SocialAuth isLoading={isLoading} />
        </motion.div>
        <button
          onClick={() => setIsLoading(!isLoading)}
          className='rounded-md bg-muted px-4 py-2 text-foreground transition-all hover:bg-muted-foreground/20'
        >
          {isLoading ? 'Enable Buttons' : 'Disable Buttons'}
        </button>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>isLoading</code>: Disable buttons when loading
          </li>
        </ul>
        <p>
          <strong>States:</strong> Normal (enabled), Disabled (loading)
        </p>
      </div>
    </section>
  );
}
