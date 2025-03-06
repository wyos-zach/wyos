'use client';

import { Button } from '@/components/ui/atoms/button';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth';
import { cn } from '@/lib/utils';

interface AuthButtonsProps {
  mobile?: boolean;
  onAction?: () => void;
}

export function AuthButtons({
  mobile = false,
  onAction = () => {},
}: AuthButtonsProps) {
  const { session, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    onAction();
    router.push('/');
  };

  const baseButtonStyles =
    'font-medium tracking-wide text-foreground bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-foreground))] hover-glow rounded-md transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)]';
  const containerStyles = mobile
    ? 'flex flex-col gap-4 pt-4'
    : 'flex items-center gap-4';

  if (session) {
    return (
      <div className={containerStyles}>
        <Button
          variant='ghost'
          className={cn(
            baseButtonStyles,
            'flex items-center justify-center gap-2 px-4 py-2',
            mobile ? 'w-full' : 'w-auto'
          )}
        >
          <User className='h-4 w-4' />
          <span>{user?.name}</span>
        </Button>
        <Button
          variant='ghost'
          onClick={handleLogout}
          className={cn(
            baseButtonStyles,
            'flex items-center justify-center gap-2 px-4 py-2',
            mobile ? 'w-full' : 'w-auto'
          )}
        >
          <LogOut className='h-4 w-4' />
          <span>Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <Link href='/login' onClick={mobile ? onAction : undefined}>
        <Button
          variant='ghost'
          className={cn(
            baseButtonStyles,
            'px-4 py-2',
            mobile ? 'w-full' : 'w-auto'
          )}
        >
          Login
        </Button>
      </Link>
      <Link href='/register' onClick={mobile ? onAction : undefined}>
        <Button
          className={cn(
            baseButtonStyles,
            'glass-effect px-4 py-2',
            mobile ? 'w-full' : 'w-auto'
          )}
        >
          {mobile ? 'Write Your Story' : 'Get Started'}
        </Button>
      </Link>
    </div>
  );
}

// Usage:
// Desktop: <AuthButtons />
// Mobile: <AuthButtons mobile onAction={closeMobileMenuAction} />import { cn } from '@/lib/utils';
