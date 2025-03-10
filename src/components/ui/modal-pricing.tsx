'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

import { Button } from '@/components/design-system/atoms/button';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/design-system/atoms/radio-group';
import { Check, Sparkles, Zap } from 'lucide-react';

interface PlanOption {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

const plansSample: PlanOption[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9',
    description: 'Perfect for side projects',
    features: ['5 projects', 'Basic analytics', '24h support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    description: 'For professional developers',
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support'],
  },
];

function ModalPricing({ plans = plansSample }: { plans: PlanOption[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  return (
    <>
      <div className='flex justify-center'>
        <Button
          onClick={() => setIsOpen(true)}
          className='bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'
        >
          <Sparkles className='mr-2 h-4 w-4' />
          Upgrade Plan
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-white'>
              <Zap className='h-5 w-5 text-zinc-900 dark:text-white' />
              Choose Your Plan
            </DialogTitle>
            <p className='text-sm text-zinc-600 dark:text-zinc-300'>
              Select the perfect plan for your needs. Upgrade or downgrade at
              any time.
            </p>
          </DialogHeader>

          <RadioGroup
            defaultValue={selectedPlan}
            onValueChange={setSelectedPlan}
            className='gap-4 py-4'
          >
            {plans.map((plan) => (
              <label
                key={plan.id}
                className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all ${
                  selectedPlan === plan.id
                    ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800/50'
                    : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
                }`}
              >
                <RadioGroupItem value={plan.id} className='sr-only' />
                <div className='mb-2 flex items-center justify-between'>
                  <div>
                    <h3 className='text-sm font-semibold text-zinc-900 dark:text-white'>
                      {plan.name}
                    </h3>
                    <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                      {plan.description}
                    </p>
                  </div>
                  <div className='flex items-baseline'>
                    <span className='text-2xl font-bold text-zinc-900 dark:text-white'>
                      {plan.price}
                    </span>
                    <span className='ml-1 text-zinc-500 dark:text-zinc-400'>
                      /mo
                    </span>
                  </div>
                </div>
                <ul className='mt-4 space-y-2'>
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center text-sm text-zinc-600 dark:text-zinc-300'
                    >
                      <Check className='mr-2 h-4 w-4 text-zinc-900 dark:text-white' />
                      {feature}
                    </li>
                  ))}
                </ul>
                {selectedPlan === plan.id && (
                  <div className='absolute -right-2 -top-2'>
                    <span className='flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-white'>
                      <Check className='h-3 w-3 text-white dark:text-zinc-900' />
                    </span>
                  </div>
                )}
              </label>
            ))}
          </RadioGroup>

          <DialogFooter className='flex flex-col gap-2'>
            <Button
              onClick={() => setIsOpen(false)}
              className='w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'
            >
              Confirm Selection
            </Button>
            <Button
              variant='ghost'
              onClick={() => setIsOpen(false)}
              className='w-full text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { ModalPricing, PlanOption };
