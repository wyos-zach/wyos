'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export const InternetsAMess = () => {
  return (
    <section className='relative py-24 md:py-32'>
      {/* Enhanced Background with multiple layers */}
      <div className='absolute inset-0'>
        {/* Primary gradient background */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />

        {/* Subtle pattern overlay */}
        <div
          className='absolute h-full w-full bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]'
          style={{ opacity: 0.03 }}
        />

        {/* Additional gradient for depth */}
        <div className='absolute inset-0 bg-gradient-to-b from-background/0 via-background to-background' />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-3xl'
        >
          {/* Enhanced Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='relative mb-12 text-center'
          >
            <h2 className='font-heading text-[40px] font-semibold tracking-wide'>
              <span className='block text-white'>The Internet's</span>
              <span className='gradient-text -mt-1 block font-medium'>
                a Mess Right Now
              </span>
            </h2>
            <div className='mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent' />
          </motion.div>

          {/* Content with enhanced styling */}
          <div className='relative space-y-6 text-lg leading-relaxed text-zinc-400'>
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
              courses with false promises. And now the rise of AI has only made
              things worse. Finding anything useful has never been more
              difficult.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              That's why we built WYOS—for the ones who want to get away from it
              all.
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

            {/* Simplified Closing Statement */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className='mt-8 text-center text-xl font-medium text-white'
            >
              If that's what you've been looking for, you're in the right place.
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
