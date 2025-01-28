/// <reference types="stripe-event-types" />

import stripe from 'stripe';

class StripeService {
  constructor() {
    // Note: stripe cjs API types are faulty
    /** @type {import('stripe').Stripe} */
    // @ts-ignore
    this.client = stripe(process.env.STRIPE_SECRET_KEY);
  }

  /**
   * @param {string} userId
   * @param {string} successUrl
   * @param {string} failureUrl
   * @param {'monthly' | 'annual'} interval
   */
  async checkoutSubscription(context, userId, successUrl, failureUrl, interval = 'monthly') {
    const priceId = interval === 'monthly' 
      ? process.env.STRIPE_PRICE_MONTHLY 
      : process.env.STRIPE_PRICE_ANNUAL;

    if (!priceId) {
      context.error(`Price ID not found for interval: ${interval}`);
      return null;
    }

    try {
      return await this.client.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        success_url: successUrl,
        cancel_url: failureUrl,
        client_reference_id: userId,
        subscription_data: {
          metadata: {
            userId,
          },
        },
        mode: 'subscription',
      });
    } catch (err) {
      context.error(err);
      return null;
    }
  }

  /**
   * @returns {import("stripe").Stripe.DiscriminatedEvent | null}
   */
  validateWebhook(context, req) {
    try {
      const event = this.client.webhooks.constructEvent(
        req.bodyBinary,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
      return /** @type {import("stripe").Stripe.DiscriminatedEvent} */ (event);
    } catch (err) {
      context.error(err);
      return null;
    }
  }

  /**
   * @param {string} subscriptionId 
   * @returns {Promise<import("stripe").Stripe.Subscription>}
   */
  async getSubscription(subscriptionId) {
    return await this.client.subscriptions.retrieve(subscriptionId);
  }
}

export default StripeService;
