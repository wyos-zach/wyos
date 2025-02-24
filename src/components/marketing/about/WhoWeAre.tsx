'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function WhoWeAre() {
  return (
    <section className='relative bg-background py-24'>
      <Container>
        <div className='mx-auto max-w-3xl space-y-24'>
          {/* Who We Are Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='font-heading text-3xl font-bold md:text-4xl'>
              Who We Are
            </h2>

            <div className='mt-8 space-y-6 text-lg text-zinc-400'>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                WYOS isn't owned by a company or backed by investors. It's an
                independent platform, developed and maintained by one person
                (hey, I'm Zach 👋).
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                The goal is to keep it that way - self-funded and sustained by
                member subscriptions, answering only to the people who use it.
              </motion.p>
            </div>
          </motion.div>

          {/* Why WYOS Exists Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='font-heading text-3xl font-bold md:text-4xl'>
              Why WYOS Exists
            </h2>

            <div className='mt-8 space-y-6 text-lg text-zinc-400'>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We're living in unprecedented times. AI is reshaping entire
                industries, people are more isolated than ever, and finding
                genuine help online feels impossible. But I believe that's
                exactly why we need to stick together.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Real growth and success rarely happen in isolation. Some of the
                most significant breakthroughs in our lives come from the
                connections we make, the knowledge we share, and the support we
                give each other. That's what WYOS is built around.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
