'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface CardCTAProps {
  children: string;
  className?: string;
}

export const CardCTA = ({ children, className }: CardCTAProps) => {
  return (
    <motion.span
      className={cn('text-xs font-medium text-primary/80', className)}
      whileHover={{ x: 5, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.span>
  );
};
