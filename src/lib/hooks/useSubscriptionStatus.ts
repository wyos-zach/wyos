import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/Auth';
import { Models, Query, RealtimeResponseEvent } from 'appwrite';
import { client, databases } from '@/models/client/config';
import { useEffect } from 'react';

// Database and collection IDs
const SUBSCRIPTIONS_DB = '677c9323003c5be0a3ba';
const SUBSCRIPTIONS_COLLECTION = '677c93a3001d74099756';

export type SubscriptionStatus = 'active' | 'inactive' | 'trialing' | 'past_due' | 'canceled' | 'loading' | 'error';

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

// Subscription document type
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
        // Query Appwrite database for subscription status
        const subscriptions = await databases.listDocuments(
          SUBSCRIPTIONS_DB,
          SUBSCRIPTIONS_COLLECTION,
          [Query.equal('userId', user.$id), Query.orderDesc('$createdAt'), Query.limit(1)]
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
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
  });

  // Set up real-time subscription updates
  useEffect(() => {
    if (!user) return;

    const unsubscribe = client.subscribe<SubscriptionDocument>(
      `databases.${SUBSCRIPTIONS_DB}.collections.${SUBSCRIPTIONS_COLLECTION}.documents`,
      (response: RealtimeResponseEvent<SubscriptionDocument>) => {
        // Only process events for the current user's subscription
        if (response.payload?.userId === user.$id) {
          // Force refetch to get the latest status
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
