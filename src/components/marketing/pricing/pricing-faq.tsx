'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Why don't you offer a free tier?",
    answer: "We believe in providing the highest quality experience without compromising our service. By focusing on a single paid tier, we can invest fully in delivering value to our committed members without the distractions of freemium limitations."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. For monthly subscriptions, you'll maintain access until the end of your billing period. For annual subscriptions, you'll maintain access until the end of your annual term."
  },
  {
    question: "What's included in my subscription?",
    answer: "Your subscription includes full access to our curated Knowledge section, vetted Resources section, and Community section. You'll get regular content updates and priority support to help you on your journey."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied with our service, contact our support team within the first 14 days for a full refund."
  }
]

export function PricingFaq() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
