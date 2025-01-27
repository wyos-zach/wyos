import type { env } from 'process';

const stripeConfig = {
  prices: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
    annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL,
  },
} as const;

export default stripeConfig;
