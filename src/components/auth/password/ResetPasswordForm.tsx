'use client';

import { useResetPasswordForm } from '@/hooks/auth/useResetPasswordForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ResetPasswordFormProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  userId: string;
  secret: string;
}

export function ResetPasswordForm({
  className,
  userId,
  secret,
  ...props
}: ResetPasswordFormProps) {
  const { isLoading, error, success, handleSubmit } = useResetPasswordForm(
    userId,
    secret
  );

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Reset your password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className='space-y-4'>
              <div className='rounded-md bg-emerald-50 p-3 text-sm text-emerald-500'>
                Your password has been reset successfully.
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
                <Label htmlFor='password'>New Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  required
                  disabled={isLoading}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
