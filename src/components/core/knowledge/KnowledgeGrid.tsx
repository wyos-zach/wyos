'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { KnowledgeCard } from './KnowledgeCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';
import type { KnowledgeEntry } from '@/types/core/knowledge';
import { Skeleton } from '@/components/ui/skeleton';

interface PaginatedResponse {
  documents: Document[];
  total: number;
}

const KnowledgeCardSkeleton = () => (
  <div className='flex flex-col gap-3 rounded-lg border p-6'>
    <Skeleton className='h-4 w-1/2' />
    <Skeleton className='h-6 w-3/4' />
    <div className='space-y-2'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-2/3' />
    </div>
  </div>
);

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
  const { selectedCategory, searchQuery } = useKnowledgeStore();
  const categoryId = selectedCategory || undefined;
  const {
    data,
    error,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['knowledge', selectedCategory, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await KnowledgeService.listKnowledgeEntries({
        categoryId,
        searchQuery,
        page: pageParam as number,
      });
      return {
        documents: response.documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          slug: doc.slug,
          summary: doc.summary,
          content: doc.content,
          categoryId: doc.categoryId,
          featured: doc.featured,
          imageUrl: doc.imageUrl,

          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
        })) as KnowledgeEntry[],
        total: response.total,
        hasMore: response.documents.length === 9,
        nextPage: pageParam + 1,
      };
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const entries =
    data?.pages.flatMap(
      (page) => page.documents as unknown as KnowledgeEntry[]
    ) || [];
  const totalEntries = data?.pages[0]?.total ?? 0;

  if (isPending) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <KnowledgeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant='destructive' className='mt-8'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error loading knowledge</AlertTitle>
        <AlertDescription>
          {error.message}
          <Button variant='ghost' className='ml-4' onClick={() => refetch()}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {entries.map((entry) => (
          <KnowledgeCard key={entry.$id} entry={entry} />
        ))}
      </div>

      {entries.length === 0 && (
        <div className='py-12 text-center text-muted-foreground'>
          <p>No entries found{searchQuery && ` for "${searchQuery}"`}</p>
          {totalEntries > 0 && selectedCategory && (
            <p className='mt-2'>Try clearing your filters</p>
          )}
        </div>
      )}

      {hasNextPage && (
        <div className='flex justify-center'>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant='outline'
            className='gap-2'
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
