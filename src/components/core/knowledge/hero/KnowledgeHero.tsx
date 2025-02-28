'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface KnowledgeHeroProps {
  title: string;
  description: string;
  className?: string;
}

export function KnowledgeHero({
  title,
  description,
  className,
}: KnowledgeHeroProps) {
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
      className={cn(
        'relative flex h-[60vh] w-full items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Dark background with strong gradient */}
      <div className='absolute inset-0 bg-[#0c0c10]' />

      {/* Radial gradient for depth */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3),transparent_70%)] opacity-80' />

      {/* Subtle grid pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20' />

      {/* Gradient overlay */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background' />

      <motion.div
        style={{ opacity, scale, y }}
        className='relative z-10 mx-auto w-full max-w-4xl px-4 text-center'
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
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='mt-6 text-lg text-zinc-300 md:text-xl lg:text-2xl'
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className='mx-auto mt-10 flex justify-center'
        >
          <div className='h-px w-14 bg-gradient-to-r from-transparent via-zinc-500 to-transparent'></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
