'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { Container } from '@/components/ui/container';

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className='relative flex h-[95vh] items-center justify-center overflow-hidden bg-background'
    >
      <Spotlight
        translateY={-350}
        width={560}
        height={1380}
        duration={7}
        xOffset={100}
      />

      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-transparent' />

      <Container className='relative z-10'>
        <motion.div
          style={{ opacity, scale }}
          className='mx-auto max-w-3xl text-center'
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='gradient-text font-heading text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl'
          >
            Building a Space Away From the Bullshit{' '}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-6 text-lg text-zinc-400'
          >
            WYOS started with a simple observation: the internet has lost its
            way. Everything's become about quick profits, manipulative tactics,
            and advice that just sounds good. We're changing that by creating
            something real - a space to actually find what works, connect with
            others, and level up their life.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
