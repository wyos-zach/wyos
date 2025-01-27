'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { defaultPricingConfig } from '@/lib/config/pricing';
import type { PricingFaqProps } from '@/types/pricing';

const faqs = [
  {
    id: 1,
    question: "Why don't you offer a free tier?",
    answer:
      'We believe in providing the highest quality experience without compromising our service. By focusing on a single paid tier, we can invest fully in delivering value to our committed members without the distractions of freemium limitations.',
  },
  {
    id: 2,
    question: 'Can I cancel my subscription anytime?',
    answer:
      "Yes, you can cancel your subscription at any time. For monthly subscriptions, you'll maintain access until the end of your billing period. For annual subscriptions, you'll maintain access until the end of your annual term.",
  },
  {
    id: 3,
    question: "What's included in my subscription?",
    answer:
      "Your subscription includes full access to our curated Knowledge section, vetted Resources section, and Community section. You'll get regular content updates and priority support to help you on your journey.",
  },
  {
    id: 4,
    question: 'Do you offer refunds?',
    answer:
      "We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied with our service, contact our support team within the first 14 days for a full refund.",
  },
];

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
