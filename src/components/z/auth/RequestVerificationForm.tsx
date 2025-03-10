'use client';

import { Button } from '@/components/ui/atoms/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/atoms/card';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/AuthStore';
import Link from 'next/link';
import { useState } from 'react';

interface RequestVerificationFormProps
  extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export function RequestVerificationForm({
  className,
  ...props
}: RequestVerificationFormProps) {
  const { requestEmailVerification } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResendVerification = async () => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    const response = await requestEmailVerification();

    if (response.error) {
      setError(response.error.message);
    } else {
      setSuccess(true);
    }

    setIsLoading(false);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Verify your email</CardTitle>
          <CardDescription>
            Check your email for a verification link. Didn't receive it?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {error && (
              <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                {error}
              </div>
            )}
            {success && (
              <div className='rounded-md bg-emerald-50 p-3 text-sm text-emerald-500'>
                Verification email sent! Please check your inbox.
              </div>
            )}
            <Button
              onClick={handleResendVerification}
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Resend verification email'}
            </Button>
            <div className='text-center text-sm text-muted-foreground'>
              <Link href='/dashboard' className='text-primary hover:underline'>
                Back to dashboard
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
