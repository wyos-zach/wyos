'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { useSubscriptionStatus } from '@/lib/hooks/subscription/useSubscriptionStatus';
import { useToast } from '@/lib/hooks/shared/useToast';
import SubscriptionLoading from '../loading';

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { status, isLoading, error, currentPeriodEnd } =
    useSubscriptionStatus();

  useEffect(() => {
    // If subscription is not active after loading, redirect to pricing
    if (!isLoading && status !== 'active' && status !== 'trialing') {
      toast({
        variant: 'destructive',
        title: 'Subscription Error',
        description:
          'Unable to verify your subscription. Redirecting to pricing...',
      });
      router.push('/pricing');
    }
  }, [status, isLoading, router, toast]);

  if (isLoading) {
    return <SubscriptionLoading />;
  }

  if (error) {
    throw error; // This will be caught by the error boundary
  }

  if (status !== 'active' && status !== 'trialing') {
    return null; // Will be redirected by useEffect
  }

  const isTrialing = status === 'trialing';
  const periodEnd = currentPeriodEnd ? new Date(currentPeriodEnd) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-2xl'>
          <CheckCircle className='h-8 w-8 text-green-500' />
          {isTrialing ? 'Welcome to Your Trial!' : 'Welcome to WYOS Pro!'}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Alert>
          <AlertTitle>
            {isTrialing
              ? 'Trial Started Successfully'
              : 'Subscription Activated Successfully'}
          </AlertTitle>
          <AlertDescription>
            {isTrialing
              ? 'Your trial period has begun. Enjoy full access to all WYOS Pro features.'
              : 'Your subscription is now active. You have full access to all WYOS Pro features.'}
            {periodEnd && (
              <p className='mt-2'>
                {isTrialing
                  ? `Trial ends on ${periodEnd.toLocaleDateString()}`
                  : `Current period ends on ${periodEnd.toLocaleDateString()}`}
              </p>
            )}
          </AlertDescription>
        </Alert>
        <div className='prose dark:prose-invert'>
          <h3>What&apos;s Next?</h3>
          <ul>
            <li>Explore our curated knowledge base</li>
            <li>Access premium resources and templates</li>
            <li>Join our community of professionals</li>
            {isTrialing && (
              <li>Set up your payment method before trial ends</li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className='flex flex-wrap gap-4'>
        <Button
          onClick={() => router.push('/knowledge')}
          className='flex items-center gap-2'
        >
          Explore Knowledge
          <ChevronRight className='h-4 w-4' />
        </Button>
        <Button
          onClick={() => router.push('/resources')}
          variant='outline'
          className='flex items-center gap-2'
        >
          View Resources
          <ChevronRight className='h-4 w-4' />
        </Button>
        {isTrialing && (
          <Button
            onClick={() => router.push('/account/subscription')}
            variant='outline'
            className='flex w-full items-center gap-2 sm:w-auto'
          >
            Manage Trial
            <ChevronRight className='h-4 w-4' />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
