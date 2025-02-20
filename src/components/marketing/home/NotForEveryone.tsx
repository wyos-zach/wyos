'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'motion/react';

export function NotForEveryone() {
  const qualities = [
    {
      right:
        "You're tired of surface-level advice and want real, practical guidance",
      wrong:
        "You're looking for quick fixes or 'hack your way to success' promises",
    },
    {
      right: "You're ready to put in the work and build lasting change",
      wrong: 'You want someone to solve all your problems for you',
    },
    {
      right: 'You value honest conversations about growth and success',
      wrong: 'You prefer feel-good content that avoids the hard truths',
    },
  ];

  return (
    <section className='relative py-24 md:py-32'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mx-auto max-w-3xl text-center'
        >
          <h2 className='font-heading text-3xl font-semibold tracking-tight md:text-4xl'>
            <span className='block text-white'>Not For Everyone.</span>
            <span className='gradient-text block'>That's The Point.</span>
          </h2>

          <p className='mt-6 text-lg text-zinc-400'>
            WYOS isn't trying to be everything for everyone. We're building this
            for people who are serious about real growth.
          </p>
        </motion.div>

        <div className='mt-16 grid gap-8 md:grid-cols-2'>
          <div className='space-y-6 rounded-xl border border-green-500/10 bg-green-500/5 p-8'>
            <h3 className='text-xl font-semibold text-green-400'>
              WYOS is for you if:
            </h3>
            <ul className='space-y-4'>
              {qualities.map((quality, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='flex items-start gap-3 text-zinc-300'
                >
                  <span className='text-green-400'>✓</span>
                  {quality.right}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className='space-y-6 rounded-xl border border-red-500/10 bg-red-500/5 p-8'>
            <h3 className='text-xl font-semibold text-red-400'>
              This isn't for you if:
            </h3>
            <ul className='space-y-4'>
              {qualities.map((quality, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='flex items-start gap-3 text-zinc-300'
                >
                  <span className='text-red-400'>×</span>
                  {quality.wrong}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
