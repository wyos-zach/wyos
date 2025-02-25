'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function AffiliateNote() {
  return (
    <section className='section-container'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-3xl'
        >
          <h2 className='font-heading text-3xl font-bold md:text-4xl'>
            A Note on Affiliate Links
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-8 rounded-xl border border-white/10 bg-card p-8'
          >
            <p className='text-lg text-zinc-400'>
              Yes, some resources in our library have affiliate programs, and we
              do use those links. But here's what makes us different:
            </p>

            <div className='gradient-divider mt-6'></div>

            <p className='mt-6 text-xl'>
              We NEVER recommend something just because it has an affiliate
              program. We recommend it because it works, and if it happens to
              have an affiliate program, we'll use that link to help keep
              membership costs down.
            </p>

            <div className='gradient-divider mt-6'></div>

            <p className='mt-6 text-lg text-zinc-400'>
              Many resources we recommend don't even have affiliate programs.
              We're not here to push products—we're here to show you what
              actually works.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
