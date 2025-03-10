'use client';

import { Skeleton } from '@/components/design-system/atoms/skeleton';
import Lenis from '@studio-freight/lenis';
import { useInfiniteQuery } from '@tanstack/react-query';
import { type ReactNode, useEffect, useRef } from 'react';

/**
 * Base interface for card data, extensible for specific sections (e.g., Knowledge, Resources).
 */
interface CardData {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: string;
}

/**
 * Props for the InfiniteCardGrid component.
 * @template T - The type of data extending CardData (e.g., KnowledgeEntry, ResourceEntry).
 */
interface InfiniteCardGridProps<T extends CardData> {
  queryKey: string[]; // Unique key for caching (e.g., ['knowledge', 'all', 'entries'] or ['resources', 'all', 'entries'])
  fetchItemsAction: (context: {
    pageParam: number;
    queryKey: string[];
  }) => Promise<{
    documents: T[];
    total: number;
    hasMore: boolean;
    nextPage: number;
  }>; // Action to fetch paginated data
  initialData?: {
    documents: T[];
    total: number;
    hasMore: boolean;
    nextPage: number;
  }; // Initial data for SSR or static generation
  renderItemAction: (item: T) => ReactNode; // Action to render each item
  className?: string; // Optional Tailwind classes for custom styling
}

/**
 * A universal infinite scrolling grid component with smooth scrolling (Lenis) and paginated loading.
 * Supports knowledge, resources, or any card-based content with customizable data fetching and rendering.
 */
export const InfiniteCardGrid = <T extends CardData>({
  queryKey,
  fetchItemsAction,
  initialData,
  renderItemAction,
  className,
}: InfiniteCardGridProps<T>) => {
  const {
    data,
    error,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchItemsAction({ pageParam, queryKey }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialData: initialData
      ? { pages: [initialData], pageParams: [1] }
      : undefined,
  });

  const items = data?.pages.flatMap((page) => page.documents) || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      infinite: false,
      wrapper: containerRef.current,
      content: contentRef.current,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Intersection Observer to fetch next page
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || !contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    const loader = contentRef.current.lastElementChild;
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{ height: '48vh', overflow: 'hidden' }}
      >
        <div
          ref={contentRef}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
          style={{ gap: '4vh' }}
        >
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className='h-[48vh] w-full rounded-xl' />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='mt-8 text-center'>
        <p className='text-destructive'>Error loading items: {error.message}</p>
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
    <div
      ref={containerRef}
      className={className}
      style={{ height: '48vh', overflow: 'hidden' }}
    >
      <div
        ref={contentRef}
        className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
        style={{ gap: '4vh' }}
      >
        {items.map((item: T) => renderItemAction(item))}
        {hasNextPage && (
          <div className='h-[48vh] w-full'>
            {isFetchingNextPage && (
              <Skeleton className='h-[48vh] w-full rounded-xl' />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
