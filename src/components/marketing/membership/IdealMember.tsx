'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/section';
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
    <Section className='relative' container={false} spacing='lg'>
      {/* Gradient overlay */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='absolute -top-96 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-blue-700/5 to-transparent blur-3xl'
        />

        <div
          className='absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]'
          style={{ opacity: 0.05 }}
        />
      </div>

      <Container className='relative z-10'>
        <div className='flex flex-col items-center mb-16'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='h-px w-20 bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-12'
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-4xl'
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center font-heading text-4xl font-bold tracking-tight md:text-5xl'
          >
            Who This Is Actually For
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-8 text-center text-lg text-zinc-300 max-w-3xl mx-auto mb-16'
          >
            WYOS isn't trying to appeal to everyone. In fact, it's probably not
            for most people — and that's exactly the point.
          </motion.p>

          <div className='relative'>
            {/* Glass card background with subtle gradients */}
            <div className='absolute inset-0 rounded-2xl bg-zinc-900/30 backdrop-blur-lg border border-zinc-800/50 overflow-hidden'>
              <div className='absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-600/5 blur-3xl' />
              <div className='absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-red-600/5 blur-3xl' />
            </div>

            <div className='relative z-10 grid gap-px md:grid-cols-2 rounded-2xl overflow-hidden backdrop-blur-xl'>
              {/* Left Side - For You */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className='bg-gradient-to-br from-black/40 to-zinc-900/40 p-8 md:p-10'
              >
                <h3 className='mb-8 font-heading text-2xl font-bold text-white border-b border-emerald-500/20 pb-4'>
                  <span className='text-emerald-400'>It's for you</span> if:
                </h3>

                <ul className='space-y-6'>
                  {forYou.map((item, index) => (
                    <motion.li
                      key={index}
                      className='flex items-start'
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <span className='flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mr-4 mt-0.5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-3.5 w-3.5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                      <span className='text-zinc-200'>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Side - Not For You */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className='bg-gradient-to-br from-black/40 to-zinc-900/40 p-8 md:p-10'
              >
                <h3 className='mb-8 font-heading text-2xl font-bold text-white border-b border-red-500/20 pb-4'>
                  <span className='text-red-400'>Not for you</span> if:
                </h3>

                <ul className='space-y-6'>
                  {notForYou.map((item, index) => (
                    <motion.li
                      key={index}
                      className='flex items-start'
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <span className='flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mr-4 mt-0.5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-3.5 w-3.5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                      <span className='text-zinc-200'>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
