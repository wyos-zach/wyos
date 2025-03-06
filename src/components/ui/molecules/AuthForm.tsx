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

interface AuthFormProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> {
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
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <div className='glass-effect mx-auto w-full max-w-md rounded-xl bg-[hsl(var(--background))] p-6 shadow-[0_4px_8px_rgba(0,0,0,0.2)]'>
        <div className='space-y-2 text-center'>
          <h2 className='bg-gradient-to-b from-[hsl(var(--foreground))/0.9] to-transparent bg-clip-text font-heading text-2xl font-bold tracking-wide text-foreground'>
            {title}
          </h2>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        <div className='mt-6 space-y-4'>
          {successMessage ? (
            <div className='space-y-2'>
              <div className='glass-effect rounded-md bg-[hsl(var(--chart-1))/0.1] p-3 text-sm text-[hsl(var(--chart-1))] shadow-[0_2px_4px_rgba(0,0,0,0.1)]'>
                {successMessage}
              </div>
              {linkText && linkHref && (
                <div className='text-center text-sm text-muted-foreground'>
                  <Link
                    href={linkHref}
                    className='text-accent-foreground hover:text-accent hover:underline'
                  >
                    {linkText}
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className='glass-effect rounded-md bg-destructive/10 p-3 text-sm text-destructive shadow-[0_2px_4px_rgba(0,0,0,0.1)]'>
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
                        className='glass-effect w-full rounded-md border border-[rgba(255,255,255,0.06)] bg-[rgba(122,122,122,0.05)] p-3 text-foreground transition-all duration-300 placeholder:text-muted-foreground focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))/0.5]'
                      />
                    </div>
                  ))}
                  <Button
                    type='submit'
                    className='glass-effect hover-glow w-full rounded-md bg-gradient-to-b from-[hsl(var(--primary))/0.1] to-[hsl(var(--background))] py-3 font-medium tracking-wide text-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : buttonText}
                  </Button>
                  {linkText && linkHref && (
                    <div className='text-center text-sm text-muted-foreground'>
                      <Link
                        href={linkHref}
                        className='text-accent-foreground hover:text-accent hover:underline'
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
                    className='glass-effect hover-glow w-full rounded-md bg-gradient-to-b from-[hsl(var(--primary))/0.1] to-[hsl(var(--background))] py-3 font-medium tracking-wide text-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : buttonText}
                  </Button>
                  {linkText && linkHref && (
                    <div className='text-center text-sm text-muted-foreground'>
                      <Link
                        href={linkHref}
                        className='text-accent-foreground hover:text-accent hover:underline'
                      >
                        {linkText}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className='glass-effect rounded-md bg-muted/10 p-3 text-sm text-muted-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)]'>
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
