'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import { type Step } from '@/types/marketing/home';
import { cn } from '@/lib/utils';

interface HowItWorksProps {
  steps: Step[];
  className?: string;
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <Container as='section' className='relative py-24 md:py-32'>
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
          How WYOS Works
        </h2>
        <p className='mt-6 text-lg text-zinc-400 sm:text-xl'>
          Three steps. Zero bullshit.
        </p>
      </motion.div>

      <div className='relative mx-auto mt-20 grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-3'>
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className='relative flex flex-col items-start text-left'
          >
            <div className='relative mb-6'>
              <div
                className={cn(
                  'flex h-16 w-16 items-center justify-center',
                  'rounded-lg border border-zinc-800 bg-blue-950/20',
                  'text-2xl font-bold text-blue-400'
                )}
              >
                {step.number}
              </div>
              <div className='absolute -inset-px rounded-lg bg-blue-500/20 blur-sm' />
            </div>

            <h3 className='mb-3 text-xl font-semibold tracking-tight'>
              {step.title}
            </h3>
            <p className='text-base text-zinc-400'>{step.description}</p>

            {index !== steps.length - 1 && (
              <motion.div
                className='absolute -right-6 top-8 hidden h-[2px] w-12 bg-blue-900/50 lg:block'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
