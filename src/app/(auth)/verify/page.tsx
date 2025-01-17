import { VerifyEmailForm } from '@/components/forms/VerifyEmailForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email - WYOS',
  description: 'Verify your WYOS account email address',
};

export default function VerifyPage() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <VerifyEmailForm />
      </div>
    </div>
  );
}
