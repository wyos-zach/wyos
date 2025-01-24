'use client';

import { VerifyEmailForm } from '@/components/auth/forms/verification/VerifyEmailForm';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const secret = searchParams.get('secret') || '';

  return <VerifyEmailForm userId={userId} secret={secret} />;
}
