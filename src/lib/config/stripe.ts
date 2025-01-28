import type { env } from 'process';

const stripeConfig = {
  prices: {
    monthly: process.env.STRIPE_PRICE_MONTHLY,
    annual: process.env.STRIPE_PRICE_ANNUAL,
  },
} as const;

export default stripeConfig;
