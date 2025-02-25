'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function IdealMember() {
  const forYou = [
    "You're tired of wasting time on generic advice that doesn't actually help",
    'You want a bullshit-free zone where people tell it like it is',
    "You're willing to contribute and help build something meaningful",
    "You're ready to put in the work, not just consume more content",
  ];

  const notForYou = [
    "You're looking for quick fixes or magic solutions",
    'You want someone to tell you exactly what to do',
    "You're not willing to engage and contribute",
    'You expect perfection from day one',
  ];

  return (
    <section className='section-container'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-3xl text-center'
        >
          <h2 className='section-title'>Who This Is Actually For</h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-6 text-lg text-zinc-400'
          >
            WYOS isn't trying to appeal to everyone. In fact, it's probably not
            for most people.
          </motion.p>

          <div className='mt-12 grid gap-8 md:grid-cols-2'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='rounded-xl border border-white/10 bg-card p-6 text-left'
            >
              <h3 className='mb-6 font-heading text-2xl font-bold text-primary'>
                It's for you if:
              </h3>
              <ul className='space-y-4 text-zinc-400'>
                {forYou.map((item, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='mr-3 mt-1 text-primary'>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='rounded-xl border border-white/10 bg-card p-6 text-left'
            >
              <h3 className='mb-6 font-heading text-2xl font-bold text-destructive'>
                It's definitely not for you if:
              </h3>
              <ul className='space-y-4 text-zinc-400'>
                {notForYou.map((item, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='mr-3 mt-1 text-destructive'>✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
