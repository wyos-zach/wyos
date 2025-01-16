'use client';

import { authApi } from '@/lib/services/appwrite/api';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='container mx-auto p-8'>
      <button
        onClick={handleLogout}
        className='rounded bg-white px-4 py-2 text-black'
      >
        Logout
      </button>
    </div>
  );
}
