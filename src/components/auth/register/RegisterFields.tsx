'use client';

import { motion } from 'framer-motion';
import { InputAnimation } from '@/components/ui/input-with-label-animation';
import { cn } from '@/lib/utils';

interface RegisterFieldsProps {
  isLoading: boolean;
}

export function RegisterFields({ isLoading }: RegisterFieldsProps) {
  const inputClasses = cn(
    'bg-zinc-900/50 backdrop-blur-sm',
    'border-zinc-800/50 focus:border-blue-900/50',
    'focus:ring-2 focus:ring-blue-900/20',
    'placeholder:text-zinc-600',
    'disabled:opacity-50'
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='space-y-6'
    >
      <div className='grid grid-cols-2 gap-4'>
        <InputAnimation
          label='First Name'
          name='firstname'
          disabled={isLoading}
          className={inputClasses}
          required
          autoComplete='given-name'
        />
        <InputAnimation
          label='Last Name'
          name='lastname'
          disabled={isLoading}
          className={inputClasses}
          required
          autoComplete='family-name'
        />
      </div>

      <InputAnimation
        label='Email'
        name='email'
        type='email'
        disabled={isLoading}
        className={inputClasses}
        required
        autoComplete='email'
      />

      <InputAnimation
        label='Password'
        name='password'
        type='password'
        disabled={isLoading}
        className={inputClasses}
        required
        autoComplete='new-password'
      />
    </motion.div>
  );
}
