import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { KnowledgeService } from '@/models/server/knowledge';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import type {
  KnowledgeEntry,
  KnowledgeCategory,
  PaginatedResult,
} from '@/types/core/knowledge';

export const useMainCategories = () => {
  return useQuery<KnowledgeCategory[]>({
    queryKey: ['knowledge', 'main-categories'],
    queryFn: () => KnowledgeService.getMainCategories(),
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSubcategories = (mainCategoryId: string) => {
  return useQuery<KnowledgeCategory[]>({
    queryKey: ['knowledge', 'subcategories', mainCategoryId],
    queryFn: () => KnowledgeService.getSubcategories(mainCategoryId),
    enabled: !!mainCategoryId,
    staleTime: 30 * 1000,
  });
};

export const useKnowledgeEntries = () => {
  const { selectedCategory, searchQuery } = useKnowledgeStore();
  return useInfiniteQuery<PaginatedResult<KnowledgeEntry>>({
    queryKey: ['knowledge', 'entries', selectedCategory, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      KnowledgeService.listKnowledgeEntries({
        categoryId: selectedCategory || undefined,
        searchQuery: searchQuery || undefined,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useKnowledgeEntry = (slug: string) => {
  return useQuery<KnowledgeEntry>({
    queryKey: ['knowledge', 'entry', slug],
    queryFn: () => KnowledgeService.getEntryBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedKnowledge = (limit: number = 3) => {
  return useQuery<KnowledgeEntry[]>({
    queryKey: ['knowledge', 'featured'],
    queryFn: () => KnowledgeService.listFeaturedEntries(limit),
    select: (data) => data.slice(0, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
