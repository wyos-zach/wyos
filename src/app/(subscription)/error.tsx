'use client';

import { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function SubscriptionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Subscription error:', error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-2xl'>
          <XCircle className='h-8 w-8 text-red-500' />
          Error
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Alert variant='destructive'>
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error.message ||
              'An error occurred while processing your subscription.'}
          </AlertDescription>
        </Alert>
        <div className='prose dark:prose-invert'>
          <p>We apologize for the inconvenience. You can try:</p>
          <ul>
            <li>Refreshing the page</li>
            <li>Checking your internet connection</li>
            <li>Contacting our support team if the problem persists</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button onClick={() => reset()} className='flex items-center gap-2'>
          Try Again
        </Button>
        <Button
          onClick={() => (window.location.href = '/contact')}
          variant='outline'
          className='flex items-center gap-2'
        >
          Contact Support
        </Button>
      </CardFooter>
    </Card>
  );
}
