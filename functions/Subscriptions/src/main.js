import StripeService from './stripe.js';
import AppwriteService from './appwrite.js';
import { getStaticFile, interpolate, throwIfMissing } from './utils.js';

export default async (context) => {
  const { req, res, log, error } = context;

  throwIfMissing(process.env, [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRICE_MONTHLY',
    'STRIPE_PRICE_ANNUAL',
    'APPWRITE_DATABASE_ID'
  ]);

  if (req.method === 'GET') {
    const html = interpolate(getStaticFile('index.html'), {
      APPWRITE_FUNCTION_API_ENDPOINT: process.env.APPWRITE_FUNCTION_API_ENDPOINT,
      APPWRITE_FUNCTION_PROJECT_ID: process.env.APPWRITE_FUNCTION_PROJECT_ID,
      APPWRITE_FUNCTION_ID: process.env.APPWRITE_FUNCTION_ID,
    });

    return res.text(html, 200, { 'Content-Type': 'text/html; charset=utf-8' });
  }

  const appwrite = new AppwriteService(context.req.headers['x-appwrite-key']);
  const stripe = new StripeService();

  switch (req.path) {
    case '/subscribe': {
      const fallbackUrl = req.scheme + '://' + req.headers['host'] + '/';
      const successUrl = req.body?.successUrl ?? fallbackUrl;
      const failureUrl = req.body?.failureUrl ?? fallbackUrl;
      const interval = req.body?.interval ?? 'monthly';

      const userId = req.headers['x-appwrite-user-id'];
      if (!userId) {
        error('User ID not found in request.');
        return res.json({ 
          success: false, 
          error: 'User ID not found in request' 
        }, 400);
      }

      const session = await stripe.checkoutSubscription(
        context,
        userId,
        successUrl,
        failureUrl,
        interval
      );
      if (!session) {
        error('Failed to create Stripe checkout session.');
        return res.json({ 
          success: false, 
          error: 'Failed to create Stripe checkout session' 
        }, 500);
      }

      log(`Created Stripe checkout session for user ${userId}.`);
      return res.json({ 
        success: true, 
        url: session.url 
      }, 200);
    }

    case '/webhook': {
      const event = stripe.validateWebhook(context, req);
      if (!event) {
        return res.json({ success: false }, 401);
      }

      log('Processing Stripe event:', event.type);

      try {
        switch (event.type) {
          case 'customer.subscription.created':
          case 'customer.subscription.updated': {
            const subscription = event.data.object;
            const userId = subscription.metadata.userId;

            await appwrite.updateSubscription(userId, subscription);
            log(`Updated subscription for user ${userId}`);
            break;
          }

          case 'customer.subscription.deleted': {
            const subscription = event.data.object;
            const userId = subscription.metadata.userId;

            await appwrite.deleteSubscription(userId);
            log(`Deleted subscription for user ${userId}`);
            break;
          }

          case 'checkout.session.completed': {
            const session = event.data.object;
            if (session.mode === 'subscription') {
              const userId = session.client_reference_id;
              const subscriptionId = session.subscription;

              const subscription = await stripe.getSubscription(subscriptionId);
              await appwrite.updateSubscription(userId, subscription);
              log(`Initialized subscription for user ${userId}`);
            }
            break;
          }

          default:
            log(`Unhandled event type: ${event.type}`);
        }

        return res.json({ success: true });
      } catch (err) {
        error('Error processing webhook:', err);
        return res.json({ success: false }, 500);
      }
    }

    default:
      return res.text('Not Found', 404);
  }
};
