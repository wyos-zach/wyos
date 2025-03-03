'use client';

import { useState } from 'react';
import { Mail, Send, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '@/components/shared/primary-button';

export default function ButtonExamples() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className='flex flex-col gap-8 p-6'>
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Basic Buttons</h2>
        <div className='flex flex-wrap gap-4'>
          <PrimaryButton>Default Button</PrimaryButton>
          <PrimaryButton variant='destructive'>Destructive</PrimaryButton>
          <PrimaryButton variant='outline'>Outline</PrimaryButton>
          <PrimaryButton variant='secondary'>Secondary</PrimaryButton>
          <PrimaryButton variant='ghost'>Ghost</PrimaryButton>
          <PrimaryButton variant='link'>Link</PrimaryButton>
        </div>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Button Sizes</h2>
        <div className='flex flex-wrap items-center gap-4'>
          <PrimaryButton size='sm'>Small</PrimaryButton>
          <PrimaryButton size='default'>Default</PrimaryButton>
          <PrimaryButton size='lg'>Large</PrimaryButton>
          <PrimaryButton size='icon'>
            <Mail className='h-4 w-4' />
          </PrimaryButton>
        </div>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>With Icons</h2>
        <div className='flex flex-wrap gap-4'>
          <PrimaryButton leftIcon={<Mail className='h-4 w-4' />}>
            Email Us
          </PrimaryButton>
          <PrimaryButton rightIcon={<ArrowRight className='h-4 w-4' />}>
            Next Step
          </PrimaryButton>
          <PrimaryButton
            leftIcon={<Send className='h-4 w-4' />}
            rightIcon={<ArrowRight className='h-4 w-4' />}
          >
            Send Message
          </PrimaryButton>
        </div>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Loading States</h2>
        <div className='flex flex-wrap gap-4'>
          <PrimaryButton loading>Loading</PrimaryButton>
          <PrimaryButton loading loadingText='Sending...'>
            Send Email
          </PrimaryButton>
          <PrimaryButton
            onClick={handleLoadingDemo}
            loading={isLoading}
            loadingText='Processing...'
          >
            {isLoading ? 'Processing' : 'Click Me'}
          </PrimaryButton>
        </div>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>With Tooltip</h2>
        <div className='flex flex-wrap gap-4'>
          <PrimaryButton tooltipText='This is a helpful tooltip'>
            Hover Me
          </PrimaryButton>
          <PrimaryButton
            tooltipText='Send an email to our support team'
            leftIcon={<Mail className='h-4 w-4' />}
          >
            Contact Support
          </PrimaryButton>
        </div>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Disabled State</h2>
        <div className='flex flex-wrap gap-4'>
          <PrimaryButton disabled>Disabled Button</PrimaryButton>
          <PrimaryButton disabled variant='outline'>
            Disabled Outline
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
