'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { MissionSectionProps } from '@/types/marketing/about';

export function MissionSection({ mission, className }: MissionSectionProps) {
  return (
    <section className={cn('relative py-24 md:py-32', className)}>
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />
      </div>

      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mx-auto max-w-[64rem] space-y-16'
        >
          <div className='space-y-8'>
            <div className='relative space-y-4'>
              <h2
                className={cn(
                  'text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl',
                  'bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent'
                )}
              >
                Our Mission
              </h2>
              <div className='h-px w-full bg-gradient-to-r from-blue-900/50 via-blue-800/50 to-transparent' />
            </div>
            <p className='text-xl text-zinc-400 md:text-2xl'>
              {mission.statement}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='relative rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-sm md:p-12'
          >
            <div className='absolute -inset-px rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent blur-sm' />
            <div className='relative space-y-6'>
              <h3 className='text-2xl font-bold tracking-tight text-white md:text-3xl'>
                Our Vision
              </h3>
              <p className='text-lg text-zinc-400 md:text-xl'>
                {mission.vision}
              </p>
            </div>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='border-l-2 border-blue-800/50 pl-6'
          >
            <p className='text-lg italic text-zinc-400 md:text-xl'>
              {mission.description}
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}
