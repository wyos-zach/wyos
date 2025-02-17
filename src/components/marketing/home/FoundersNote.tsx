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
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1),transparent_50%)]' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative mx-auto max-w-[64rem] rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-sm md:p-12'
      >
        <div className='absolute -inset-px rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent blur-sm' />

        <div className='relative space-y-8'>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <div className='absolute -inset-px rounded-lg bg-blue-500/20 blur-sm' />
            </div>
            <div>
              <div className='font-mono text-sm text-zinc-400'>
                From the Founder
              </div>
              <div className='font-semibold tracking-tight text-white'>
                {founderName}
              </div>
              <div className='text-sm text-zinc-500'>{founderTitle}</div>
            </div>
          </div>

          <blockquote className='space-y-4 border-l-2 border-blue-800/50 pl-6'>
            <p className='text-lg font-medium leading-relaxed text-zinc-300 md:text-xl md:leading-relaxed'>
              {message}
            </p>
          </blockquote>
        </div>
      </motion.div>
    </Container>
  );
}
