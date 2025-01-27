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
import { XCircle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/shared/useToast';

export default function SubscriptionCancelPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Show toast message when the page loads
    toast({
      title: 'Checkout Cancelled',
      description:
        'Your subscription checkout was cancelled. No charges have been made.',
      variant: 'default',
    });
  }, [toast]);

  return (
    <Card className='duration-500 animate-in fade-in slide-in-from-bottom-4'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-2xl'>
          <XCircle className='h-8 w-8 text-red-500' />
          Subscription Cancelled
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Alert>
          <AlertTitle>No Changes Made</AlertTitle>
          <AlertDescription>
            Your subscription checkout was cancelled. No charges have been made
            to your account.
          </AlertDescription>
        </Alert>
        <div className='prose dark:prose-invert'>
          <p>
            We understand that you might need more time to decide. Here&apos;s
            what you can do next:
          </p>
          <ul>
            <li>Review our pricing plans and features again</li>
            <li>Contact our support team if you have any questions</li>
            <li>Try our free features to get a better feel for WYOS</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className='flex flex-wrap gap-4'>
        <Button
          onClick={() => router.push('/pricing')}
          className='flex items-center gap-2'
          size='lg'
        >
          Return to Pricing
          <ChevronRight className='h-4 w-4' />
        </Button>
        <Button
          onClick={() => router.push('/contact')}
          variant='outline'
          className='flex items-center gap-2'
          size='lg'
        >
          Contact Support
          <ChevronRight className='h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  );
}
