import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/Auth';
import { Models } from 'appwrite';

export type SubscriptionStatus = 'active' | 'inactive' | 'loading' | 'error';

interface UseSubscriptionStatusReturn {
  status: SubscriptionStatus;
  isLoading: boolean;
  error: Error | null;
  user: Models.User<Models.Preferences> | null;
  refetch: () => Promise<void>;
}

export function useSubscriptionStatus(): UseSubscriptionStatusReturn {
  const { user } = useAuthStore();

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
        const response = await fetch('/api/subscription/status', {
          headers: {
            'X-User-ID': user.$id,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subscription status');
        }

        const data = await response.json();
        return data;
      } catch (err) {
        throw new Error('Failed to check subscription status');
      }
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
  });

  const status: SubscriptionStatus = isLoading
    ? 'loading'
    : error
      ? 'error'
      : subscriptionData?.status || 'inactive';

  return {
    status,
    isLoading,
    error: error as Error | null,
    user,
    refetch: async () => {
      await refetch();
    },
  };
}
