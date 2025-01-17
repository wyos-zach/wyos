import { ResetPasswordForm } from '@/components/forms/ResetPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password - WYOS',
  description: 'Set your new WYOS account password',
};

export default function ResetPasswordPage() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
