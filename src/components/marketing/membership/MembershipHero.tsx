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

  return (
    <section
      ref={containerRef}
      className='relative flex h-[70vh] items-center justify-center overflow-hidden bg-background'
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
            WYOS Membership
          </motion.h1>
        </motion.div>
      </Container>
    </section>
  );
}
