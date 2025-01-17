'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { account } from '@/lib/services/appwrite/config';
import Link from 'next/link';

interface ResetPasswordFormProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !secret) {
      setError('Invalid reset link');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await account.updateRecovery(userId, secret, password);
      router.push('/login?reset=success');
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId || !secret) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='space-y-4'>
            <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
              Invalid password reset link. Please request a new one.
            </div>
            <Link
              href='/forgot-password'
              className='text-sm text-muted-foreground hover:underline'
            >
              Back to forgot password
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Reset password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
              <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                {error}
              </div>
            )}
            <div className='space-y-2'>
              <Label htmlFor='password'>New Password</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
