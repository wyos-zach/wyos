'use client';

import { RegisterHeader } from '@/components/auth/forms/register/RegisterHeader';
import { RegisterFields } from '@/components/auth/forms/register/RegisterFields';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { RippleButton } from '@/components/ui/ripple-button';
import { useRegisterForm } from '@/lib/hooks/auth/useRegister';
import { motion } from 'framer-motion';

export default function Register() {
  const { isLoading, error, handleSubmit } = useRegisterForm();

  return (
    <div className='relative mx-auto w-full max-w-lg'>
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm md:p-8'
      >
        <div className='absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/50 to-transparent' />

        <RegisterHeader error={error} />

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <RegisterFields isLoading={isLoading} />

          <RippleButton
            type='submit'
            disabled={isLoading}
            className='w-full bg-blue-900 text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-900/50 disabled:bg-zinc-800 disabled:text-zinc-400'
          >
            {isLoading ? (
              <span className='flex items-center justify-center gap-2'>
                <svg className='h-5 w-5 animate-spin' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Creating Account...
              </span>
            ) : (
              'Write Your Story'
            )}
          </RippleButton>

          <div className='relative my-8'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-zinc-800/50' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-zinc-900/50 px-2 text-zinc-500'>
                Or continue with
              </span>
            </div>
          </div>

          <SocialAuth isLoading={isLoading} />
        </form>
      </motion.div>
    </div>
  );
}
