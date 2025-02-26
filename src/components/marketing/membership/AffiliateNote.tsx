'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export function AffiliateNote() {
  return (
    <Section
      className='relative overflow-hidden'
      container={false}
      spacing='lg'
    >
      {/* Gradient background effect */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.03),transparent_55%)]' />
      </div>

      <Container className='relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-4xl'
        >
          <div className='mx-auto mb-16 flex justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className='h-px w-16 bg-gradient-to-r from-transparent via-blue-600/40 to-transparent'
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center font-heading text-3xl font-bold md:text-4xl mb-10'
          >
            A Note on Affiliate Links
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='relative overflow-hidden rounded-2xl border border-zinc-800/50 backdrop-blur-md'
          >
            {/* Subtle glow effect */}
            <div className='absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl' />
            <div className='absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl' />

            <div className='relative z-10 p-8 md:p-10'>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='text-lg text-zinc-300'
              >
                Yes, some resources in our library have affiliate programs, and
                we do use those links. But here's what makes us different:
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className='my-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent'
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='rounded-xl bg-gradient-to-br from-zinc-900/50 to-black/20 p-6 md:p-8 border border-zinc-800/30'
              >
                <p className='text-xl font-medium leading-relaxed text-white'>
                  We NEVER recommend something just because it has an affiliate
                  program. We recommend it because it works, and if it happens
                  to have an affiliate program, we'll use that link to help keep
                  membership costs down.
                </p>
              </motion.div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className='my-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent'
              />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='text-lg text-zinc-300'
              >
                Many resources we recommend don't even have affiliate programs.
                We're not here to push products—we're here to show you what
                actually works.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
