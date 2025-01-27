/**
 * Represents a billing interval for a pricing plan
 */
export type BillingInterval = 'monthly' | 'annual';

/**
 * Represents an individual benefit item in a pricing plan
 */
export interface BenefitItem {
  id: string;
  title: string;
  description?: string;
}

/**
 * Represents a complete pricing plan configuration
 */
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  interval: BillingInterval;
  price: number;
  priceDisplay: string;
  secondaryPriceDisplay?: string;
  isPopular?: boolean;
  benefits: BenefitItem[];
}

/**
 * Represents a FAQ item in the pricing section
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Props for the PricingSection component
 */
export interface PricingSectionProps {
  plans?: PricingPlan[];
  showComparison?: boolean;
}

/**
 * Props for the PricingCard component
 */
export interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

/**
 * Props for the PricingFaq component
 */
export interface PricingFaqProps {
  faqs?: FaqItem[];
  className?: string;
}
