'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'motion/react';
import { type Benefit } from '@/types/marketing/home';
import { cn } from '@/lib/utils';

interface BenefitsProps {
  benefits: Benefit[];
}

export function Benefits({ benefits }: BenefitsProps) {
  return (
    <Container as='section' className='relative py-24 md:py-32'>
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1),transparent_50%)]' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='mx-auto max-w-[64rem] text-center'
      >
        <h2
          className={cn(
            'text-4xl font-bold tracking-tight',
            'bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent',
            'sm:text-5xl'
          )}
        >
          Why Choose WYOS?
        </h2>
        <p className='mt-6 text-lg text-zinc-400 sm:text-xl'>
          No fluff. No BS. Just what works.
        </p>
      </motion.div>

      <div className='mx-auto mt-20 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className={cn(
              'group relative rounded-lg border border-zinc-800/50',
              'bg-zinc-900/50 p-8 backdrop-blur-sm',
              'transition-all duration-300 hover:border-blue-900/50',
              'hover:bg-blue-950/10'
            )}
          >
            <div className='relative z-10 flex flex-col items-start text-left'>
              <div className='mb-4 rounded-lg bg-blue-950/50 p-3'>
                {benefit.icon}
              </div>
              <h3 className='mb-3 text-xl font-semibold tracking-tight'>
                {benefit.title}
              </h3>
              <p className='text-base text-zinc-400 transition-colors group-hover:text-zinc-300'>
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
