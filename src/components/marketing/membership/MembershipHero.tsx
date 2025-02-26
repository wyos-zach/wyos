'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { Container } from '@/components/ui/container';

export function MembershipHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={containerRef}
      className='relative flex h-[80vh] items-center justify-center overflow-hidden bg-background'
    >
      <Spotlight
        translateY={-350}
        width={560}
        height={1380}
        duration={7}
        xOffset={100}
        gradientFirst='radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .07) 0, hsla(210, 100%, 55%, .03) 50%, hsla(210, 100%, 45%, 0) 80%)'
        gradientSecond='radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .05) 0, hsla(210, 100%, 55%, .03) 80%, transparent 100%)'
      />

      {/* Grid pattern overlay with low opacity */}
      <div
        className='absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]'
        style={{ opacity: 0.05 }}
      />

      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-transparent' />

      <Container className='relative z-10'>
        <motion.div
          style={{ opacity, scale, y }}
          className='mx-auto max-w-3xl text-center'
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.5 }}
            className='mx-auto mb-6 flex justify-center'
          >
            <div className='h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent'></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='gradient-text font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl'
          >
            No BS Membership for Real Growth
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className='mx-auto mt-10 flex justify-center'
          >
            <div className='h-px w-14 bg-gradient-to-r from-transparent via-zinc-500 to-transparent'></div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
