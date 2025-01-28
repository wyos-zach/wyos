import stripe from 'stripe';

class StripeService {
  constructor() {
    /** @type {import('stripe').Stripe} */
    this.client = stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  }

  /**
   * @param {import('appwrite').Context} context
   * @param {string} userId
   * @param {string} successUrl
   * @param {string} failureUrl
   * @param {'monthly' | 'annual'} interval
   */
  async checkoutSubscription(
    context,
    userId,
    successUrl,
    failureUrl,
    interval = 'monthly'
  ) {
    const priceId =
      interval === 'monthly'
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL;

    if (!priceId) {
      context.error(`Price ID not found for interval: ${interval}`);
      return null;
    }

    try {
      return await this.client.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
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
   * @param {import('appwrite').Context} context
   * @param {import('appwrite').Context['req']} req
   * @returns {import('stripe').Stripe.Event | null}
   */
  validateWebhook(context, req) {
    try {
      const event = this.client.webhooks.constructEvent(
        req.bodyBinary,
        req.headers['stripe-signature'],
        process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
      );
      return event;
    } catch (err) {
      context.error(err);
      return null;
    }
  }

  /**
   * @param {string} subscriptionId
   * @returns {Promise<import('stripe').Stripe.Subscription>}
   */
  async getSubscription(subscriptionId) {
    return await this.client.subscriptions.retrieve(subscriptionId);
  }
}

export default StripeService;
