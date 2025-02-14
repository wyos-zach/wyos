import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { useAuthStore } from '@/store/Auth';
import { User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

type MobileAuthButtonsProps = {
  closeMobileMenu: () => void;
};

export function MobileAuthButtons({ closeMobileMenu }: MobileAuthButtonsProps) {
  const { session, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    closeMobileMenu();
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
      <Link href='/login' onClick={closeMobileMenu}>
        <Button variant='ghost' className='w-full'>
          Login
        </Button>
      </Link>
      <Link href='/register' onClick={closeMobileMenu}>
        <ShinyButton className='mt-4 w-full'>Write Your Story</ShinyButton>
      </Link>
    </div>
  );
}
