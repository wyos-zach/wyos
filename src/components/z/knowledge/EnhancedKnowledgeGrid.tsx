'use client';
import { Skeleton } from '@/components/design-system/atoms/skeleton';
import { InfiniteGrid } from '@/components/z/shared/InfiniteGrid';
import { KnowledgeService } from '@/models/server/knowledge';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EnhancedKnowledgeCategoryCard } from './EnhancedKnowledgeCategoryCard';
import { EntryModal } from './entries/EntryModal';

interface EnhancedKnowledgeGridProps {
  categorySlug?: string;
  initialData?: {
    documents: KnowledgeEntry[];
    total: number;
    hasMore: boolean;
    nextPage: number;
  };
}

export const EnhancedKnowledgeGrid = ({
  categorySlug,
  initialData,
}: EnhancedKnowledgeGridProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the entry slug from the URL query parameter
  const entrySlug = searchParams.get('entry');

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<KnowledgeEntry | null>(null);
  const [currentEntryIndex, setCurrentEntryIndex] = useState<number>(-1);

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
        categorySlug: doc.categorySlug
          ? doc.categorySlug
          : categorySlug || 'uncategorized',
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

  // Effect to handle URL changes
  useEffect(() => {
    if (entrySlug && entries.length > 0) {
      const entry = entries.find((e) => e.slug === entrySlug);
      if (entry) {
        setCurrentEntry(entry);
        setCurrentEntryIndex(entries.findIndex((e) => e.slug === entrySlug));
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false);
    }
  }, [entrySlug, entries]);

  // Handle opening the modal
  const handleOpenModal = (entry: KnowledgeEntry) => {
    // Update the URL with the entry slug
    const params = new URLSearchParams(searchParams.toString());
    params.set('entry', entry.slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    // Remove the entry slug from the URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete('entry');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Handle navigation to previous entry
  const handlePreviousEntry = () => {
    if (currentEntryIndex > 0) {
      const prevEntry = entries[currentEntryIndex - 1];
      const params = new URLSearchParams(searchParams.toString());
      params.set('entry', prevEntry.slug);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  // Handle navigation to next entry
  const handleNextEntry = () => {
    if (currentEntryIndex < entries.length - 1) {
      const nextEntry = entries[currentEntryIndex + 1];
      const params = new URLSearchParams(searchParams.toString());
      params.set('entry', nextEntry.slug);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
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
    <>
      <InfiniteGrid
        hasMore={hasNextPage}
        isFetching={isFetchingNextPage}
        fetchNextAction={() => fetchNextPage()}
      >
        {entries.map((entry: KnowledgeEntry) => (
          <button
            key={entry.$id}
            onClick={() => handleOpenModal(entry)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenModal(entry);
              }
            }}
            className='w-full cursor-pointer border-none bg-transparent p-0 text-left'
            aria-label={`Open ${entry.title}`}
          >
            <EnhancedKnowledgeCategoryCard
              category={{
                $id: entry.$id,
                name: entry.title,
                slug: entry.slug,
                description: entry.summary,
                order: 0,
                isActive: true,
                imageUrl: entry.imageUrl,
                $createdAt: entry.$createdAt,
                $updatedAt: entry.$updatedAt,
              }}
            />
          </button>
        ))}
      </InfiniteGrid>

      {/* Entry Modal */}
      {currentEntry && (
        <EntryModal
          entry={currentEntry}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onPrevious={handlePreviousEntry}
          onNext={handleNextEntry}
          hasPrevious={currentEntryIndex > 0}
          hasNext={currentEntryIndex < entries.length - 1}
        />
      )}
    </>
  );
};
