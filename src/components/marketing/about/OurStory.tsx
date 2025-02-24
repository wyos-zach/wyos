'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function OurStory() {
  return (
    <section className='relative -mt-32'>
      <div className='absolute inset-0 h-[50vh]'>
        {' '}
        {/* Limit gradient height */}
        {/* Primary gradient background */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0),transparent_50%)]' />
        {/* Subtle pattern overlay */}
        <div
          className='absolute h-full w-full bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]'
          style={{ opacity: 0.02 }}
        />
        {/* Additional gradient for depth - limit the height */}
        <div className='absolute inset-0 h-full bg-gradient-to-b from-transparent via-background/50 to-background' />
      </div>

      <Container className='relative pt-32'>
        {' '}
        {/* Add relative to ensure content stays above gradients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-3xl'
        >
          <h2 className='font-heading text-3xl font-bold md:text-4xl'>
            Our Story
          </h2>

          <div className='mt-8 space-y-6 text-lg text-zinc-400'>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              WYOS started in 2019 during my darkest moments. While building my
              first business and dealing with personal struggles, I spent
              countless hours searching for genuine help. What I found instead
              was an endless maze of paywalls, affiliate links, and generic
              advice that led nowhere.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              The more I searched, the clearer it became - finding real help
              shouldn't be this hard. We shouldn't have to wade through
              mountains of fluff just to find one piece of valuable information.
              That's when I decided to build something different.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              In 2025, WYOS launched as a platform that brings together the
              absolute best information, resources, and community - all in one
              place, without the hype or manipulation. We're creating something
              real here, and we're building it with our members, not for them.
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
