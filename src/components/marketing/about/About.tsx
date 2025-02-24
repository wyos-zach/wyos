'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function AboutSection({
  title,
  children,
  className,
}: AboutSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      <Container className='mx-auto max-w-3xl space-y-4'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        {children}
      </Container>
    </motion.section>
  );
}
