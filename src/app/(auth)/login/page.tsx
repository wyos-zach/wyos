'use client';

import { LoginHeader } from '@/components/auth/forms/login/LoginHeader';
import { LoginFields } from '@/components/auth/forms/login/LoginFields';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { RippleButton } from '@/components/ui/ripple-button';
import { useLoginForm } from '@/lib/hooks/auth/useLogin';

export default function LoginPage() {
  const { isLoading, error, handleSubmit } = useLoginForm();

  return (
    <div className='mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8'>
      <LoginHeader error={error} />

      <form className='my-8 space-y-4' onSubmit={handleSubmit}>
        <LoginFields isLoading={isLoading} />

        <RippleButton type='submit' disabled={isLoading} className='w-full'>
          {isLoading ? 'Logging in...' : 'Login'}
        </RippleButton>

        <SocialAuth isLoading={isLoading} />
      </form>
    </div>
  );
}
