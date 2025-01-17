'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/services/appwrite/api';
import type { Models } from 'appwrite';

export function Navbar() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      router.push('/login');
    } catch {
      console.error('Logout failed');
    }
  };

  if (loading) {
    return <div className='h-16 border-b'></div>;
  }

  return (
    <nav className='flex h-16 items-center justify-between border-b px-4'>
      <Link href='/' className='text-xl font-bold'>
        WYOS
      </Link>

      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <span className='text-sm text-muted-foreground'>{user.email}</span>
            <Button variant='outline' onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Button variant='ghost'>Login</Button>
            </Link>
            <Link href='/register'>
              <Button>Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
