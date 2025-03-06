'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Label } from '@/components/ui/atoms/label';

interface AuthFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

interface AuthFormProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> {
  type:
    | 'forgot-password'
    | 'request-verification'
    | 'reset-password'
    | 'verify-email';
  title: string;
  description: string;
  fields?: AuthFormField[];
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onButtonClick?: () => void;
  buttonText?: string;
  successMessage?: string;
  errorMessage?: string;
  isLoading?: boolean;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export function AuthForm({
  title,
  description,
  fields = [],
  onSubmit,
  onButtonClick,
  buttonText,
  successMessage,
  errorMessage,
  isLoading = false,
  linkText,
  linkHref,
  className,
  ...props
}: AuthFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='glass-effect gradient-border mx-auto w-full max-w-md rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
        <div className='space-y-2 text-center'>
          <h2 className='bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--foreground))] bg-clip-text font-heading text-2xl font-bold tracking-wide text-transparent'>
            {title}
          </h2>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        <div className='mt-6'>
          {successMessage ? (
            <div className='space-y-4'>
              <div className='rounded-md bg-[hsl(var(--chart-1))/0.1] p-3 text-sm text-[hsl(var(--chart-1))] shadow-inset-custom'>
                {successMessage}
              </div>
              {linkText && linkHref && (
                <div className='text-center text-sm text-muted-foreground'>
                  <Link
                    href={linkHref}
                    className='text-accent-foreground transition-colors hover:text-accent hover:underline'
                  >
                    {linkText}
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className='mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]'>
                  {errorMessage}
                </div>
              )}
              {fields.length > 0 && onSubmit ? (
                <form onSubmit={onSubmit} className='space-y-4'>
                  {fields.map((field) => (
                    <div key={field.id} className='space-y-2'>
                      <Label
                        htmlFor={field.id}
                        className='text-sm text-foreground'
                      >
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={isLoading}
                        className='w-full rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-3 text-foreground placeholder-muted-foreground shadow-inset-custom transition-all duration-300 focus:ring-2 focus:ring-ring'
                      />
                    </div>
                  ))}
                  <Button
                    type='submit'
                    className='hover-glow w-full rounded-md bg-gradient-to-r from-primary to-[hsl(var(--primary-foreground))] py-3 font-semibold text-foreground transition-all duration-300'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : buttonText}
                  </Button>
                  {linkText && linkHref && (
                    <div className='text-center text-sm text-muted-foreground'>
                      <Link
                        href={linkHref}
                        className='text-accent-foreground transition-colors hover:text-accent hover:underline'
                      >
                        {linkText}
                      </Link>
                    </div>
                  )}
                </form>
              ) : onButtonClick ? (
                <div className='space-y-4'>
                  <Button
                    onClick={onButtonClick}
                    className='hover-glow w-full rounded-md bg-gradient-to-r from-primary to-[hsl(var(--primary-foreground))] py-3 font-semibold text-foreground transition-all duration-300'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : buttonText}
                  </Button>
                  {linkText && linkHref && (
                    <div className='text-center text-sm text-muted-foreground'>
                      <Link
                        href={linkHref}
                        className='text-accent-foreground transition-colors hover:text-accent hover:underline'
                      >
                        {linkText}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className='rounded-md bg-muted/20 p-3 text-sm text-muted-foreground shadow-inset-custom'>
                  Please wait while we process your request...
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
