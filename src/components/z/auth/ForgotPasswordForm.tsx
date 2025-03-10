'use client';

import { Button } from '@/components/design-system/atoms/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/design-system/atoms/card';
import { Input } from '@/components/design-system/atoms/input';
import { Label } from '@/components/design-system/atoms/label';
import { useForgotPasswordForm } from '@/lib/hooks/auth/useForgotPassword';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ForgotPasswordFormProps
  extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export function ForgotPasswordForm({
  className,
  ...props
}: ForgotPasswordFormProps) {
  const { isLoading, error, success, handleSubmit } = useForgotPasswordForm();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className='space-y-4'>
              <div className='rounded-md bg-emerald-50 p-3 text-sm text-emerald-500'>
                Check your email for a password reset link.
              </div>
              <Link
                href='/login'
                className='text-sm text-muted-foreground hover:underline'
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              {error && (
                <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                  {error}
                </div>
              )}
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>
              <div className='text-center text-sm text-muted-foreground'>
                Remember your password?{' '}
                <Link href='/login' className='text-primary hover:underline'>
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
