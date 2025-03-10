'use client';

import { Button } from '@/components/ui/atoms/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { useAuthStore } from '@/store/AuthStore';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AuthButtonsProps {
  onAction?: () => void;
}

export function AuthButtons({ onAction = () => {} }: AuthButtonsProps) {
  const { session, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    onAction();
    router.push('/');
  };

  if (session) {
    return (
      <div className='flex items-center gap-4'>
        <Button variant='ghost'>
          <User className='h-4 w-4' />
          <span>{user?.name}</span>
        </Button>
        <Button
          variant='ghost'
          onClick={handleLogout}
          className='flex items-center gap-2 font-medium tracking-wide text-zinc-400 hover:bg-blue-950/30 hover:text-white'
        >
          <LogOut className='h-4 w-4' />
          <span>Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-4'>
      <Link href='/login'>
        <Button
          variant='ghost'
          className='font-medium tracking-wide text-zinc-400 hover:bg-blue-950/30 hover:text-white'
        >
          Login
        </Button>
      </Link>
      <Link href='/register'>
        <ShinyButton>Get Started</ShinyButton>
      </Link>
    </div>
  );
}
