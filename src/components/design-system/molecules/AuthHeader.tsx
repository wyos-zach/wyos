import Link from 'next/link';
import { motion } from 'motion/react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  error?: string;
}

export function AuthHeader({
  title,
  subtitle,
  linkText,
  linkHref,
  error,
}: AuthHeaderProps) {
  return (
    <div className='space-y-4 text-center'>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--foreground))] bg-clip-text font-heading text-2xl font-bold tracking-wide text-foreground shadow-[0_2px_6px_rgba(0,0,0,0.15)] md:text-3xl'
      >
        {title}
      </motion.h2>
      <p className='glass-effect mx-auto max-w-sm rounded-lg p-3 text-sm text-muted-foreground shadow-inset-custom'>
        {subtitle}{' '}
        <Link
          href={linkHref}
          className='text-accent-foreground underline-offset-4 transition-colors duration-300 hover:text-accent hover:underline'
        >
          {linkText}
        </Link>
      </p>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className='mx-auto max-w-sm rounded-md bg-destructive/15 p-2 text-sm text-destructive-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]'
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
