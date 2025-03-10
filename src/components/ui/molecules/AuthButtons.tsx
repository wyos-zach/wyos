'use client';

import { Button } from '@/components/ui/atoms/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/AuthStore';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    'bg-gradient-to-b from-[hsl(var(--muted))/0.8] to-[hsl(var(--background))] glass-effect text-foreground font-thin tracking-wide shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover-glow transition-all duration-200 rounded-md px-4 py-2';

  const containerStyles = mobile
    ? 'flex flex-col gap-2 pt-2'
    : 'flex items-center gap-2';

  if (session) {
    return (
      <div className={containerStyles}>
        <Button
          variant='ghost'
          className={cn(
            baseButtonStyles,
            mobile ? 'w-full justify-center' : 'w-auto'
          )}
        >
          <User className='mr-2 h-4 w-4' />
          <span>{user?.name}</span>
        </Button>
        <Button
          variant='ghost'
          onClick={handleLogout}
          className={cn(
            baseButtonStyles,
            mobile ? 'w-full justify-center' : 'w-auto'
          )}
        >
          <LogOut className='mr-2 h-4 w-4' />
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
          className={cn(baseButtonStyles, mobile ? 'w-full' : 'w-auto')}
        >
          Login
        </Button>
      </Link>
      <Link href='/register' onClick={mobile ? onAction : undefined}>
        <Button className={cn(baseButtonStyles, mobile ? 'w-full' : 'w-auto')}>
          Get Started
        </Button>
      </Link>
    </div>
  );
}
