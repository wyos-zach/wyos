import { motion } from 'motion/react';

export const HeroText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`text-center font-heading tracking-tight ${className || ''}`}
  >
    {children}
  </motion.div>
);
