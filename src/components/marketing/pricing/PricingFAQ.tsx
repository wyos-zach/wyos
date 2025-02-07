'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { defaultPricingConfig } from '@/lib/config/site/pricing';
import type { PricingFaqProps } from '@/types/marketing/pricing';

export function PricingFaq({
  faqs = defaultPricingConfig.faqs,
  className = '',
}: PricingFaqProps) {
  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      <h2 className='mb-8 text-center text-2xl font-bold'>
        Frequently Asked Questions
      </h2>
      <Accordion type='single' collapsible className='w-full'>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
