'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CommunityCTA() {
  const _router = useRouter();

  const handleNavigateToDiscourse = () => {
    // Consider adding SSO check here if needed
    window.location.href = 'https://community.writingyourownstory.com';
  };

  return (
    <div className='text-center'>
      <Button
        onClick={handleNavigateToDiscourse}
        className='px-8 py-6 text-lg'
        variant='default'
      >
        Enter Community Forum
      </Button>
    </div>
  );
}
