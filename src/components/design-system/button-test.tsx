'use client';

import React, { useState } from 'react';
import { PrimaryButton } from '@/components/shared/primary-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowRight, Check } from 'lucide-react';

export function ButtonTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleClick2 = () => {
    setIsLoading2(true);
    setTimeout(() => {
      setIsLoading2(false);
    }, 2000);
  };

  return (
    <section id='button-test' className='space-y-6 border-t py-8'>
      <h2 className='font-heading text-2xl font-semibold'>Button Testing</h2>
      <p className='text-muted-foreground'>
        Test the loading state and click animations of the PrimaryButton
        component.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Button Test</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex flex-wrap gap-4'>
            <div className='space-y-2'>
              <PrimaryButton
                onClick={handleClick}
                loading={isLoading}
                loadingText='Loading...'
              >
                Click to Test Loading
              </PrimaryButton>
              <div className='text-xs text-muted-foreground'>
                Click to see the loading state with fixed spinner position
              </div>
            </div>

            <div className='space-y-2'>
              <PrimaryButton
                variant='secondary'
                onClick={handleClick2}
                loading={isLoading2}
              >
                Secondary Loading
              </PrimaryButton>
              <div className='text-xs text-muted-foreground'>
                Test loading state on secondary variant
              </div>
            </div>

            <div className='space-y-2'>
              <PrimaryButton
                leftIcon={<Mail className='h-4 w-4' />}
                rightIcon={<ArrowRight className='h-4 w-4' />}
              >
                Click to Test Animation
              </PrimaryButton>
              <div className='text-xs text-muted-foreground'>
                Click to see the subtle press animation
              </div>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Card className='bg-muted/50 p-4'>
              <h3 className='mb-2 text-sm font-semibold'>Fixed Issues:</h3>
              <ul className='space-y-2'>
                <li className='flex items-start gap-2 text-sm'>
                  <Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span>
                    Loading spinner is properly centered and doesn't float
                    during animation
                  </span>
                </li>
                <li className='flex items-start gap-2 text-sm'>
                  <Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span>
                    Added subtle click animation with spring physics for better
                    feedback
                  </span>
                </li>
                <li className='flex items-start gap-2 text-sm'>
                  <Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span>
                    Fixed TypeScript compatibility with motion components
                  </span>
                </li>
              </ul>
            </Card>

            <Card className='bg-muted/50 p-4'>
              <h3 className='mb-2 text-sm font-semibold'>
                Implementation Details:
              </h3>
              <ul className='space-y-2'>
                <li className='flex items-start gap-2 text-sm'>
                  <span className='mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-blue-500' />
                  <span>
                    Used <code>motion.div</code> wrapper for animation instead
                    of direct button animation
                  </span>
                </li>
                <li className='flex items-start gap-2 text-sm'>
                  <span className='mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-blue-500' />
                  <span>
                    Spring animation with stiffness: 500, damping: 30 for
                    natural feel
                  </span>
                </li>
                <li className='flex items-start gap-2 text-sm'>
                  <span className='mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-blue-500' />
                  <span>
                    Animation disabled during loading state to prevent UI
                    confusion
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
