import type { Metadata } from 'next';
import { PricingSection } from '@/components/marketing/pricing/PricingSection';
import { PricingFaq } from '@/components/marketing/pricing/PricingFaq';

export const metadata: Metadata = {
  title: 'Pricing | WYOS',
  description:
    'Simple, transparent pricing for Writing Your Own Story. No hidden fees, no gimmicks - just the tools you need to write your story.',
};

export default function PricingPage() {
  return (
    <div className='container relative'>
      <div className='mx-auto max-w-5xl px-6 py-16 md:py-24'>
        <div className='mb-12 flex flex-col items-center text-center'>
          <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]'>
            Simple, Transparent Pricing
          </h1>
          <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
            No hidden fees. No gimmicks. Just the tools you need to write your
            story.
          </p>
        </div>

        <PricingSection />

        <div className='mt-24'>
          <PricingFaq />
        </div>
      </div>
    </div>
  );
}
