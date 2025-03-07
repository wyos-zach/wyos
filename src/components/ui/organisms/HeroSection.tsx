'use client';

import { HeroContent } from '@/components/ui/molecules/HeroContent';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function HeroSection({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
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
        className='relative z-10 mx-auto flex h-full w-full max-w-5xl items-center justify-center rounded-lg'
      >
        <HeroContent title={title} description={description} />
      </motion.div>
    </section>
  );
}
