'use client';

import { Button } from '@/components/ui/atoms/button';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';

export function CommunityCTA() {
  const { session } = useAuthStore();
  const router = useRouter();

  const handleCommunityAccess = () => {
    if (!session) {
      // If not logged in, redirect to login page with return URL
      router.push('/login?redirect=/community');
      return;
    }

    // If logged in, redirect to Discourse's SSO endpoint
    window.location.href = 'https://community.writingyourownstory.com';
  };

  return (
    <div className='text-center'>
      <Button
        onClick={handleCommunityAccess}
        className='px-8 py-6 text-lg'
        variant='default'
      >
        {session ? 'Enter Community Forum' : 'Join Our Community'}
      </Button>
      <p className='mt-4 text-sm text-muted-foreground'>
        {session
          ? 'You will be redirected to our community platform'
          : 'Login required to access the community'}
      </p>
    </div>
  );
}
