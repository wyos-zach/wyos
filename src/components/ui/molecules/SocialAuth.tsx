'use client';

import { Button } from '@/components/ui/atoms/button';
import { useAuthStore } from '@/store/Auth';
import { OAuthProvider } from 'appwrite';
import { cn } from '@/lib/utils';

interface OAuthButtonProps {
  provider: OAuthProvider;
  label: string;
  disabled: boolean;
  icon: React.ReactNode;
}

function OAuthButton({ provider, label, disabled, icon }: OAuthButtonProps) {
  const { createOAuthSession } = useAuthStore();

  const handleOAuthLogin = async () => {
    try {
      await createOAuthSession(provider);
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  return (
    <Button
      onClick={handleOAuthLogin}
      variant='outline'
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center gap-3 px-4 py-3',
        'glass-effect bg-gradient-to-r from-[hsl(var(--muted))/0.8] to-[hsl(var(--background))]',
        'hover-glow shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]',
        'rounded-md font-medium tracking-wide text-foreground transition-all duration-300'
      )}
    >
      {icon}
      <span className='ml-2'>{label}</span>
    </Button>
  );
}

export function SocialAuth({ isLoading }: { isLoading: boolean }) {
  const providers = [
    {
      provider: OAuthProvider.Google,
      label: 'Continue with Google',
      icon: (
        <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
          {/* Placeholder - Replace with official Google icon */}
          <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
          <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
          <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
          <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
        </svg>
      ),
    },
  ];

  return (
    <div className='space-y-4'>
      <div className='my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-[hsl(var(--muted))/0.5] to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.1)]' />
      <div className='space-y-2'>
        {providers.map(({ provider, label, icon }) => (
          <OAuthButton
            key={provider}
            provider={provider}
            label={label}
            disabled={isLoading}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}
