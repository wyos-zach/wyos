'use client';

import { type ReactNode } from 'react';

interface SubscriptionLayoutProps {
  children: ReactNode;
}

export default function SubscriptionLayout({
  children,
}: SubscriptionLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <div className='container mx-auto px-4 py-8'>
          <div className='mx-auto max-w-2xl space-y-8'>{children}</div>
        </div>
      </main>
    </div>
  );
}
