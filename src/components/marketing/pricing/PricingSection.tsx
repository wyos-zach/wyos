'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { defaultPricingConfig } from '@/lib/config/pricing';
import type {
  PricingSectionProps,
  PricingCardProps,
} from '@/types/marketing/pricing';
import { useSubscriptionStatus } from '@/lib/hooks/useSubscriptionStatus';
import { useToast } from '@/lib/hooks/useToast';
import { PricingErrorBoundary } from './PricingErrorBoundary';
import { Functions, type Models } from 'appwrite';
import { useAuthStore } from '@/store/Auth';
import { client } from '@/models/client/config';

// Function IDs constant
const FUNCTION_IDS = {
  stripeCheckout: 'stripe-checkout',
} as const;

function PricingCard({ plan, className = '' }: PricingCardProps) {
  const { toast } = useToast();
  const { status, isLoading, error, user, refetch } = useSubscriptionStatus();
  const isPopular = plan.isPopular;

  const handleSubscriptionAction = async () => {
    if (!user) {
      // Redirect to sign in with return URL
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/sign-in?redirect=${returnUrl}`;
      return;
    }

    if (status === 'active') {
      // Redirect to subscription management
      window.location.href = '/account/subscription';
      return;
    }

    try {
      // Show loading state in toast
      toast({
        title: 'Processing...',
        description: 'Preparing your subscription checkout...',
      });

      // Initialize Appwrite Functions SDK with existing client
      const functions = new Functions(client);

      // Call the Stripe checkout function
      const execution = await functions.createExecution(
        FUNCTION_IDS.stripeCheckout,
        JSON.stringify({
          planId: plan.id,
          successUrl: `${window.location.origin}/account/subscription?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        })
      );

      // Parse the result from the function execution
      const result = JSON.parse(execution.responseBody);

      if (!result?.url) {
        throw new Error('No checkout URL returned from function');
      }

      // Redirect to Stripe checkout
      window.location.href = result.url;
    } catch (err) {
      console.error('Subscription error:', err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'Failed to process subscription request. Please try again later.',
      });
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Loading...';
    if (error) return 'Try Again';
    if (!user) return 'Sign Up';
    if (status === 'active') return 'Manage Subscription';
    return `Get Started ${plan.name}`;
  };

  return (
    <Card
      className={`flex flex-col ${
        isPopular
          ? 'relative before:absolute before:inset-0 before:-m-[2px] before:rounded-lg before:border-2 before:border-primary'
          : ''
      } ${className}`}
    >
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='mb-6'>
          <span className='text-4xl font-bold'>{plan.priceDisplay}</span>
          <span className='ml-1 text-muted-foreground'>
            /{plan.interval === 'monthly' ? 'month' : 'year'}
          </span>
          {plan.secondaryPriceDisplay && (
            <div className='mt-1 text-sm text-muted-foreground'>
              {plan.secondaryPriceDisplay}
            </div>
          )}
        </div>
        <ul className='space-y-3'>
          {plan.benefits.map((benefit) => (
            <li key={benefit.id} className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-primary' />
              <span>{benefit.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          size='lg'
          onClick={handleSubscriptionAction}
          disabled={isLoading}
          aria-label={`${getButtonText()} - ${plan.name} plan`}
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Loading...
            </>
          ) : (
            getButtonText()
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PricingSection({
  plans = defaultPricingConfig.plans,
}: PricingSectionProps) {
  return (
    <PricingErrorBoundary>
      <div className='grid gap-8 md:grid-cols-2 lg:gap-12'>
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </PricingErrorBoundary>
  );
}
