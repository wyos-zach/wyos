'use client';

import { RegisterHeader } from '@/components/auth/register/RegisterHeader';
import { RegisterFields } from '@/components/auth/register/RegisterFields';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { RippleButton } from '@/components/ui/ripple-button';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';

export default function Register() {
  const { isLoading, error, handleSubmit } = useRegisterForm();

  return (
    <div className='mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8'>
      <RegisterHeader error={error} />

      <form className='my-8 space-y-4' onSubmit={handleSubmit}>
        <RegisterFields isLoading={isLoading} />

        <RippleButton type='submit' disabled={isLoading} className='w-full'>
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </RippleButton>

        <SocialAuth isLoading={isLoading} />
      </form>
    </div>
  );
}
