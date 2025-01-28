import { BenefitItem, FaqItem, PricingPlan } from '@/types/marketing/pricing';
import type { env } from 'process';

const STRIPE_PRICES = {
  MONTHLY: process.env.STRIPE_PRICE_MONTHLY,
  ANNUAL: process.env.STRIPE_PRICE_ANNUAL,
} as const;

/**
 * Core benefits available in WYOS subscriptions
 */
export const benefits: BenefitItem[] = [
  {
    id: 'knowledge',
    title: 'Access to curated Knowledge section',
    description:
      'Dive into our carefully curated knowledge base designed to help you grow',
  },
  {
    id: 'resources',
    title: 'Access to vetted Resources section',
    description: 'Explore our hand-picked collection of tools and resources',
  },
  {
    id: 'community',
    title: 'Access to the Community section',
    description: 'Connect with like-minded individuals on similar journeys',
  },
  {
    id: 'updates',
    title: 'Regular content updates',
    description: 'Stay current with fresh, relevant content added regularly',
  },
  {
    id: 'support',
    title: 'Priority support',
    description: 'Get help when you need it with our dedicated support team',
  },
];

/**
 * Available pricing plans
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    description: 'Pay month-to-month, cancel anytime',
    interval: 'monthly',
    price: 29.99,
    priceDisplay: '$29.99',
    benefits: benefits,
    stripePriceId: STRIPE_PRICES.MONTHLY ?? '',
  },
  {
    id: 'annual',
    name: 'Annual',
    description: 'Our most popular plan',
    interval: 'annual',
    price: 240,
    priceDisplay: '$240',
    secondaryPriceDisplay: '$20/month, billed annually',
    isPopular: true,
    benefits: benefits,
    stripePriceId: STRIPE_PRICES.ANNUAL ?? '',
  },
];

/**
 * Frequently asked questions about pricing
 */
export const pricingFaqs: FaqItem[] = [
  {
    id: 'no-free-tier',
    question: "Why don't you offer a free tier?",
    answer:
      'We believe in providing the highest quality experience without compromising our service. By focusing on a single paid tier, we can invest fully in delivering value to our committed members without the distractions of freemium limitations.',
  },
  {
    id: 'cancellation',
    question: 'Can I cancel my subscription anytime?',
    answer:
      "Yes, you can cancel your subscription at any time. For monthly subscriptions, you'll maintain access until the end of your billing period. For annual subscriptions, you'll maintain access until the end of your annual term.",
  },
  {
    id: 'whats-included',
    question: "What's included in my subscription?",
    answer:
      "Your subscription includes full access to our curated Knowledge section, vetted Resources section, and Community section. You'll get regular content updates and priority support to help you on your journey.",
  },
  {
    id: 'refunds',
    question: 'Do you offer refunds?',
    answer:
      "We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied with our service, contact our support team within the first 14 days for a full refund.",
  },
];

/**
 * Default pricing section configuration
 */
export const defaultPricingConfig = {
  showComparison: false,
  plans: pricingPlans,
  faqs: pricingFaqs,
};
