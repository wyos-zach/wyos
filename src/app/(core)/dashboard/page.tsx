'use client';

import { useAuthStore } from '@/store/Auth';

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className='container mx-auto mt-8'>
      <div className='grid gap-4'>{/* Add your dashboard content here */}</div>
    </div>
  );
}
