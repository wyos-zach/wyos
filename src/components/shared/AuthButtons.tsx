import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { useAuthStore } from '@/store/Auth';
import { User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

type AuthButtonsProps = {
  onAction?: () => void; // Optional callback (e.g., to close a mobile menu if needed)
};

export function AuthButtons({ onAction = () => {} }: AuthButtonsProps) {
  const { session, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    onAction();
  };

  if (session) {
    return (
      <>
        <Button
          variant='ghost'
          className='flex items-center gap-2 font-medium tracking-wide text-zinc-400 hover:bg-blue-950/30 hover:text-white'
        >
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
      </>
    );
  }

  return (
    <>
      <Link href='/login'>
        <Button
          variant='ghost'
          className='font-medium tracking-wide text-zinc-400 hover:bg-blue-950/30 hover:text-white'
        >
          Login
        </Button>
      </Link>
      <Link href='/register'>
        <ShinyButton className='font-medium tracking-wide'>
          Get Started
        </ShinyButton>
      </Link>
    </>
  );
}
