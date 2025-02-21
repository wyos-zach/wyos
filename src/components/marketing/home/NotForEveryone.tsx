'use client';

import { Section } from '@/components/ui/section';
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
      wrong: 'You prefer feel-good content and avoid hard truths',
    },
  ];

  return (
    <Section background='gradient'>
      {/* Enhanced Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative mb-12 text-center'
      >
        <h2 className='font-heading text-[40px] font-semibold tracking-wide'>
          <span className='block text-white'>Not For Everyone.</span>
          <span className='gradient-text -mt-1 block'>That's The Point.</span>
        </h2>
        <div className='mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent' />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='mx-auto max-w-3xl'
      >
        <p className='text-center text-lg leading-relaxed text-zinc-400 md:text-xl'>
          WYOS isn't trying to be everything for everyone. We're building this
          for people who are serious about real growth.
        </p>
      </motion.div>

      <div className='mt-16 grid gap-8 md:grid-cols-2'>
        {/* Wrong Column - Left side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className='space-y-6 rounded-xl border border-red-800/20 bg-card p-8 shadow-lg transition-colors'
        >
          <h3 className='text-xl font-semibold text-red-700'>
            This isn't for you if:
          </h3>
          <ul className='space-y-4'>
            {qualities.map((quality, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='flex items-start gap-3 text-zinc-400'
              >
                <span className='shrink-0 text-red-700'>×</span>
                <span>{quality.wrong}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column - Right side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className='space-y-6 rounded-xl border border-emerald-900/20 bg-card p-8 shadow-lg transition-colors'
        >
          <h3 className='text-xl font-semibold text-emerald-800'>
            WYOS is for you if:
          </h3>
          <ul className='space-y-4'>
            {qualities.map((quality, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='flex items-start gap-3 text-zinc-400'
              >
                <span className='shrink-0 text-emerald-800'>✓</span>
                <span>{quality.right}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
