'use client';

import { Button } from '@/components/design-system/atoms/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { useAuthStore } from '@/store/AuthStore';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type MobileAuthButtonsProps = {
  closeMobileMenuAction: () => void;
};

export function MobileAuthButtons({
  closeMobileMenuAction,
}: MobileAuthButtonsProps) {
  const { session, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    closeMobileMenuAction();
  };

  if (session) {
    return (
      <div className='pt-4'>
        <Button
          variant='ghost'
          className='flex w-full items-center justify-center gap-2'
        >
          <User className='h-4 w-4' />
          <span>{user?.name}</span>
        </Button>
        <Button
          variant='ghost'
          onClick={handleLogout}
          className='mt-4 flex w-full items-center justify-center gap-2'
        >
          <LogOut className='h-4 w-4' />
          <span>Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <div className='pt-4'>
      <Link href='/login' onClick={closeMobileMenuAction}>
        <Button variant='ghost' className='w-full'>
          Login
        </Button>
      </Link>
      <Link href='/register' onClick={closeMobileMenuAction}>
        <ShinyButton className='mt-4 w-full'>Write Your Story</ShinyButton>
      </Link>
    </div>
  );
}
