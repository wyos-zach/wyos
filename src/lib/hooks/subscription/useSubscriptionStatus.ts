import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/Auth';
import { Models, Query, RealtimeResponseEvent } from 'appwrite';
import { client, databases } from '@/models/client/config';
import { db, userSubscriptionsCollection } from '@/models/name';
import { useEffect } from 'react';

export type SubscriptionStatus =
  | 'active'
  | 'inactive'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'loading'
  | 'error';

interface SubscriptionData {
  status: SubscriptionStatus;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

interface UseSubscriptionStatusReturn {
  status: SubscriptionStatus;
  isLoading: boolean;
  error: Error | null;
  user: Models.User<Models.Preferences> | null;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  refetch: () => Promise<void>;
}

interface SubscriptionDocument {
  userId: string;
  status: SubscriptionStatus;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export function useSubscriptionStatus(): UseSubscriptionStatusReturn {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: subscriptionData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['subscription', user?.$id],
    queryFn: async () => {
      if (!user) {
        return { status: 'inactive' as const };
      }

      try {
        const subscriptions = await databases.listDocuments(
          db,
          userSubscriptionsCollection,
          [
            Query.equal('userId', user.$id),
            Query.orderDesc('$createdAt'),
            Query.limit(1),
          ]
        );

        if (subscriptions.documents.length === 0) {
          return { status: 'inactive' as const };
        }

        const subscription = subscriptions.documents[0];
        return {
          status: subscription.status as SubscriptionStatus,
          currentPeriodEnd: subscription.currentPeriodEnd,
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        };
      } catch (err) {
        console.error('Subscription status error:', err);
        throw new Error('Failed to check subscription status');
      }
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (!user) return;

    const unsubscribe = client.subscribe<SubscriptionDocument>(
      `databases.${db}.collections.${userSubscriptionsCollection}.documents`,
      (response: RealtimeResponseEvent<SubscriptionDocument>) => {
        if (response.payload?.userId === user.$id) {
          refetch();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user, refetch]);

  return {
    status: subscriptionData?.status ?? 'loading',
    isLoading,
    error: error as Error | null,
    user,
    currentPeriodEnd: subscriptionData?.currentPeriodEnd,
    cancelAtPeriodEnd: subscriptionData?.cancelAtPeriodEnd,
    refetch: async () => {
      await refetch();
    },
  };
}
