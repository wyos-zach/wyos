'use client';

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const secret = searchParams.get('secret') || '';

  return <ResetPasswordForm userId={userId} secret={secret} />;
}
