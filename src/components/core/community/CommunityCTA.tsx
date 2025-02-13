'use client';

import { useAuthStore } from '@/store/Auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CommunityCTA() {
  const { session } = useAuthStore();
  const router = useRouter();

  const handleCommunityAccess = () => {
    if (!session) {
      router.push('/login?redirect=/community');
      return;
    }

    // Redirect to Discourse's SSO endpoint which will then redirect back to our SSO endpoint
    window.location.href =
      'https://community.writingyourownstory.com/session/sso';
  };

  return (
    <div className='text-center'>
      <Button
        onClick={handleCommunityAccess}
        className='px-8 py-6 text-lg'
        variant='default'
      >
        Enter Community Forum
      </Button>
      <p className='mt-4 text-sm text-muted-foreground'>
        {session
          ? 'You will be redirected to our community platform'
          : 'Login required to access the community'}
      </p>
    </div>
  );
}
