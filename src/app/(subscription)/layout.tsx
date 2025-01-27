'use client';

import SubscriptionLoading from './loading';

interface SubscriptionLayoutProps {
  children: React.ReactNode;
}

export default function SubscriptionLayout({ children }: SubscriptionLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl mx-auto space-y-8">
        {children}
      </div>
    </div>
  );
}
