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
import { defaultPricingConfig } from '@/lib/config/site/pricing';
import type {
  PricingSectionProps,
  PricingCardProps,
} from '@/types/marketing/pricing';
import { useToast } from '@/lib/hooks/shared/useToast';
import { PricingErrorBoundary } from './PricingErrorBoundary';
import { useState } from 'react';

// Function domain constant
const FUNCTION_DOMAIN = 'https://67995290e7d65c0017dd.appwrite.global';

function PricingCard({ plan, className = '' }: PricingCardProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isPopular = plan.isPopular;

  const handleSubscriptionAction = () => {
    setIsLoading(true);

    try {
      // Redirect to the function's /subscribe endpoint
      window.location.href = `${FUNCTION_DOMAIN}/subscribe`;
    } catch (err) {
      console.error('Subscription error:', err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not process subscription. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
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
      <CardFooter className='relative z-10'>
        <Button
          className='relative z-10 w-full'
          size='lg'
          onClick={handleSubscriptionAction}
          disabled={isLoading}
          variant={isPopular ? 'default' : 'outline'}
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing...
            </>
          ) : (
            'Get Started'
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
