'use client';

import { useVerifyEmailForm } from '@/hooks/auth/useVerifyEmailForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface VerifyEmailFormProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  userId: string;
  secret: string;
}

export function VerifyEmailForm({
  className,
  userId,
  secret,
  ...props
}: VerifyEmailFormProps) {
  const { isLoading, error, success } = useVerifyEmailForm(userId, secret);

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
            ) : success ? (
              <div className='rounded-md bg-emerald-50 p-3 text-sm text-emerald-500'>
                Email verified successfully! You can now{' '}
                <Link href='/login' className='text-primary hover:underline'>
                  login
                </Link>{' '}
                to your account.
              </div>
            ) : (
              <div className='rounded-md bg-muted p-3 text-sm'>
                Please wait while we verify your email...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
