import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { ResourceService } from '@/models/server/resources';
import { useResourcesStore } from '@/store/useResourcesStore';
import type {
  ResourceEntry,
  ResourceCategory,
  PaginatedResult,
} from '@/types/core/resources';

export const useMainCategories = () => {
  return useQuery<ResourceCategory[]>({
    queryKey: ['resources', 'main-categories'],
    queryFn: () => ResourceService.getMainCategories(),
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSubcategories = (mainCategoryId: string) => {
  return useQuery<ResourceCategory[]>({
    queryKey: ['resources', 'subcategories', mainCategoryId],
    queryFn: () => ResourceService.getSubcategories(mainCategoryId),
    enabled: !!mainCategoryId,
    staleTime: 30 * 1000,
  });
};

export const useResourceEntries = () => {
  const { selectedCategory, searchQuery } = useResourcesStore();
  return useInfiniteQuery<PaginatedResult<ResourceEntry>>({
    queryKey: ['resources', 'entries', selectedCategory, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      ResourceService.listResourceEntries({
        categoryId: selectedCategory || undefined,
        searchQuery: searchQuery || undefined,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export function useResourceEntry(slug: string) {
  return useQuery({
    queryKey: ['resources', 'entry', slug],
    queryFn: async () => {
      const entry = await ResourceService.getEntryBySlug(slug);
      if (!entry) throw new Error('Resource not found');
      return entry;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedResources = (limit = 3) => {
  return useQuery<ResourceEntry[]>({
    queryKey: ['resources', 'featured', limit],
    queryFn: () => ResourceService.listFeaturedEntries(limit),
    select: (data) => data.slice(0, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
