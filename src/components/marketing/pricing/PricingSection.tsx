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
import type { PricingSectionProps, PricingCardProps } from '@/types/pricing';
import { useSubscriptionStatus } from '@/lib/hooks/useSubscriptionStatus';
import { useToast } from '@/hooks/use-toast';
import { PricingErrorBoundary } from './PricingErrorBoundary';

function PricingCard({ plan, className = '' }: PricingCardProps) {
  const { toast } = useToast();
  const { status, isLoading, error, user, refetch } = useSubscriptionStatus();
  const isPopular = plan.isPopular;

  const handleSubscriptionAction = async () => {
    if (!user) {
      // Redirect to sign in
      window.location.href = '/sign-in?redirect=/pricing';
      return;
    }

    if (status === 'active') {
      // Redirect to subscription management
      window.location.href = '/account/subscription';
      return;
    }

    try {
      // Handle subscription flow
      window.location.href = '/api/subscription/create-checkout';
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'Failed to process subscription request. Please try again.',
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
