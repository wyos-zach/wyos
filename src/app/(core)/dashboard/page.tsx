'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth';

interface User {
  email: string;
  name: string;
}

export default function DashboardPage() {
  const { user, session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      {user && (
        <div className='space-y-4'>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
        </div>
      )}
    </div>
  );
}
