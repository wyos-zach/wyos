import { motion } from 'motion/react';

export const GradientDivider = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.7 }}
    transition={{ duration: 1.5 }}
    className={`h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent ${className || ''}`}
  />
);
