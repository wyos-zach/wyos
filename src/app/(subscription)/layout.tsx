'use client';

import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/Auth';
import { useEffect } from 'react';
import SubscriptionLoading from './loading';

interface SubscriptionLayoutProps {
  children: React.ReactNode;
}

export default function SubscriptionLayout({ children }: SubscriptionLayoutProps) {
  const { user, hydrated, verifySession } = useAuthStore();

  useEffect(() => {
    // Verify session on mount
    verifySession();
  }, [verifySession]);

  // Show loading while hydrating auth state
  if (!hydrated) {
    return <SubscriptionLoading />;
  }

  // Redirect if not authenticated
  if (!user) {
    redirect('/sign-in?redirect=/subscription');
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl mx-auto">{children}</div>
    </div>
  );
}
