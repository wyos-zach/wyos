'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export const InternetsAMess = () => {
  return (
    <section className='relative py-24 md:py-32'>
      {/* Gradient Background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] opacity-[0.03] [background-size:32px_32px]' />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-3xl'
        >
          {/* Title with gradient border */}
          <div className='relative mb-12'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                'font-heading text-3xl font-semibold tracking-tight md:text-4xl',
                'gradient-text'
              )}
            >
              The Internet's a Mess Right Now
            </motion.h2>
            <div className='absolute -inset-x-4 bottom-0 h-px bg-gradient-to-r from-blue-900/50 via-blue-800/50 to-transparent' />
          </div>

          {/* Content with improved typography and spacing */}
          <div className='space-y-6 text-lg leading-relaxed text-zinc-400'>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everywhere you look, there's fake positivity, generic advice, and
              it seems like people are only looking out for themselves.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Social media is just highlights and filters. "Gurus" push their
              courses with false promises. And finding anything useful has
              become like searching for a needle in a haystack full of affiliate
              links. On top of that, AI is only making the situation worse.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              That's why we built WYOS—a space where you can finally get away
              from it all.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              No fake motivation. No "one-size-fits-all" solutions. No hidden
              agendas or manipulation tactics. Just the best information and
              resources that we've come across combined with a community of
              people who are actually trying to help each other level up.
            </motion.p>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className='mt-12 space-y-6'
            >
              <p className='text-xl font-semibold text-white'>
                If that sounds like you, you're in the right place.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
