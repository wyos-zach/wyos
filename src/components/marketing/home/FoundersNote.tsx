'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'motion/react';
import { type FoundersNote as FoundersNoteType } from '@/types/marketing/home';

type FoundersNoteProps = FoundersNoteType;

export function FoundersNote({
  message,
  founderName,
  founderTitle,
}: FoundersNoteProps) {
  return (
    <Container as='section' className='relative py-24 md:py-32'>
      {/* Keep the radial gradient background */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1),transparent_50%)]' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative mx-auto max-w-[64rem] rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-8 shadow-lg backdrop-blur-sm md:p-12'
      >
        {/* Subtle gradient overlay for a premium feel */}
        <div className='pointer-events-none absolute -inset-px rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent blur-sm' />

        <div className='relative space-y-8'>
          {/* Founder info */}
          <div className='flex items-center gap-4'>
            <div className='flex-shrink-0'>
              {/* Using the founder's initial as a placeholder */}
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/30'>
                {founderName ? founderName.charAt(0) : ''}
              </div>
            </div>
            <div>
              <p className='font-mono text-xs uppercase text-zinc-400'>
                From the Founder
              </p>
              <h3 className='text-xl font-semibold text-white'>
                {founderName}
              </h3>
              <p className='text-xs text-zinc-500'>{founderTitle}</p>
            </div>
          </div>

          {/* Founder’s message without a blockquote */}
          <div className='space-y-4'>
            <p className='text-lg leading-relaxed text-zinc-300'>{message}</p>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
