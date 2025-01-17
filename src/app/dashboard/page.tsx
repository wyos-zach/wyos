// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/services/appwrite/api';

interface User {
  email: string;
  name: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        if (!currentUser) {
          router.push('/login');
          return;
        }
        setUser(currentUser);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    void checkUser();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-lg'>
        <h1 className='mb-4 text-2xl font-bold'>Welcome to your Dashboard!</h1>
        {user && (
          <div className='space-y-4'>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
