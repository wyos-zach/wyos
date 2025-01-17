'use client';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { account } from '@/lib/services/appwrite/config';
import Link from 'next/link';

interface VerifyEmailFormProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export function VerifyEmailForm({ className, ...props }: VerifyEmailFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !secret) {
        setError('Invalid verification link');
        setIsLoading(false);
        return;
      }

      try {
        await account.updateVerification(userId, secret);
        router.push('/dashboard?verified=true');
      } catch (error) {
        setError('Email verification failed. Please try again.');
        console.error('Verification failed:', error);
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [userId, secret, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Email verification</CardTitle>
          <CardDescription>
            {isLoading
              ? 'Verifying your email...'
              : 'Email verification status'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {error ? (
              <>
                <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                  {error}
                </div>
                <div className='text-center text-sm text-muted-foreground'>
                  <Link
                    href='/verification'
                    className='text-primary hover:underline'
                  >
                    Request new verification email
                  </Link>
                </div>
              </>
            ) : (
              <div className='rounded-md bg-muted p-3 text-sm'>
                {isLoading
                  ? 'Please wait while we verify your email...'
                  : 'Email verified successfully!'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
