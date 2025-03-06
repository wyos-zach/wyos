'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { KnowledgeCard } from './KnowledgeCard';
import { Skeleton } from '@/components/ui/atoms/skeleton';
import { InfiniteGrid } from '@/components/shared/InfiniteGrid';
import { KnowledgeService } from '@/models/server/knowledge';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

interface KnowledgeGridProps {
  categorySlug?: string;
  initialData?: {
    documents: KnowledgeEntry[];
    total: number;
    hasMore: boolean;
    nextPage: number;
  };
}

export const KnowledgeGrid = ({
  categorySlug,
  initialData,
}: KnowledgeGridProps) => {
  const {
    data,
    error,
    isError,
    isFetchingNextPage,

    hasNextPage,
    fetchNextPage,

    refetch,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['knowledge', categorySlug, ''],
    queryFn: async ({ pageParam = 1 }) => {
      // First get the category by slug to get its ID
      const category = categorySlug
        ? await KnowledgeService.getCategoryBySlug(categorySlug)
        : null;

      const response = await KnowledgeService.listKnowledgeEntries({
        categoryId: category?.$id,
        page: pageParam,
      });

      // Ensure that every mapped document includes categorySlug.
      const mappedDocuments = response.documents.map((doc) => ({
        ...doc,
        categorySlug: doc.categorySlug ? doc.categorySlug : doc.categoryId,
      }));
      return {
        documents: mappedDocuments as KnowledgeEntry[],
        total: response.total,
        hasMore: response.documents.length === 9,
        nextPage: pageParam + 1,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
  });

  // Flatten all pages into a single array.
  const entries = data?.pages.flatMap((page) => page.documents) || [];
  const _totalEntries = data?.pages[0]?.total ?? 0;

  const _getFirstCategoryId = (doc: KnowledgeEntry): string => {
    return doc.categoryId || '';
  };

  if (isPending) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className='mt-8 text-center'>
        <p className='text-red-500'>Error loading entries: {error.message}</p>
        <button
          onClick={() => refetch()}
          className='rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <InfiniteGrid
      hasMore={hasNextPage}
      isFetching={isFetchingNextPage}
      fetchNextAction={() => fetchNextPage()}
    >
      {entries.map((entry: KnowledgeEntry) => (
        <KnowledgeCard key={entry.$id} entry={entry} />
      ))}
    </InfiniteGrid>
  );
};
