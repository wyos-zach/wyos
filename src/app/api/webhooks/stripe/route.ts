import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Query } from 'node-appwrite';

import { databases } from '@/models/server/config';
import { db, userSubscriptionsCollectionId } from '@/models/name';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No stripe signature found' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const status = subscription.status;
        const priceId = subscription.items.data[0].price.id;

        // Create or update subscription document
        try {
          const subscriptions = await databases.listDocuments(
            db,
            userSubscriptionsCollectionId,
            [Query.equal('$id', customerId), Query.limit(1)]
          );

          const subscriptionData = {
            $id: customerId,
            status: status,
            priceId: priceId,
            subscriptionId: subscription.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
          };

          if (subscriptions.documents.length > 0) {
            await databases.updateDocument(
              db,
              userSubscriptionsCollectionId,
              subscriptions.documents[0].$id,
              subscriptionData
            );
          } else {
            await databases.createDocument(
              db,
              userSubscriptionsCollectionId,
              'unique()',
              subscriptionData
            );
          }
        } catch (err) {
          console.error('Error updating subscription:', err);
          throw err;
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find and update the subscription document
        const subscriptions = await databases.listDocuments(
          db,
          userSubscriptionsCollectionId,
          [Query.equal('$id', customerId), Query.limit(1)]
        );

        if (subscriptions.documents.length > 0) {
          await databases.updateDocument(
            db,
            userSubscriptionsCollectionId,
            subscriptions.documents[0].$id,
            {
              status: 'canceled',
              currentPeriodEnd: null,
            }
          );
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription') {
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          // Fetch the subscription details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Create or update subscription document
          try {
            const subscriptions = await databases.listDocuments(
              db,
              userSubscriptionsCollectionId,
              [Query.equal('$id', customerId), Query.limit(1)]
            );

            const subscriptionData = {
              $id: customerId,
              status: subscription.status,
              priceId: subscription.items.data[0].price.id,
              subscriptionId: subscription.id,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
            };

            if (subscriptions.documents.length > 0) {
              await databases.updateDocument(
                db,
                userSubscriptionsCollectionId,
                subscriptions.documents[0].$id,
                subscriptionData
              );
            } else {
              await databases.createDocument(
                db,
                userSubscriptionsCollectionId,
                'unique()',
                subscriptionData
              );
            }
          } catch (err) {
            console.error('Error updating subscription:', err);
            throw err;
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
