import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password - WYOS',
  description: 'Reset your WYOS account password',
};

export default function ForgotPasswordPage() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
