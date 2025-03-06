import Link from 'next/link';
import { motion } from 'motion/react';

interface RegisterHeaderProps {
  error?: string;
}

export function RegisterHeader({ error }: RegisterHeaderProps) {
  return (
    <div className='space-y-4'>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-2xl font-bold tracking-tight text-white md:text-3xl'
      >
        Write Your Own Story
      </motion.h2>
      <p className='text-sm text-zinc-400'>
        Ready to start? Create your account below.{' '}
        <Link
          href='/login'
          className='text-blue-400 transition-colors hover:text-blue-300'
        >
          Already have an account?
        </Link>
      </p>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='rounded-md bg-red-900/20 p-3'
        >
          <p className='text-sm text-red-400'>{error}</p>
        </motion.div>
      )}
    </div>
  );
}
