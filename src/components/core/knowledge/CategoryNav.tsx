'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';

export const CategoryNav = () => {
  const { selectedCategory, setCategory } = useKnowledgeStore();
  const { data: categories, isPending } = useQuery({
    queryKey: ['knowledge', 'main-categories'],
    queryFn: async () => {
      const cats = await KnowledgeService.getMainCategories();
      return cats;
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Use useCallback to memoize the function
  const handleCategorySelect = useCallback(
    (slug?: string) => {
      // Prevent default scroll behavior
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (slug) {
        newSearchParams.set('category', slug);
      } else {
        newSearchParams.delete('category');
      }

      // Clear other store-related params
      newSearchParams.delete('knowledge-store');
      newSearchParams.delete('sortBy');
      newSearchParams.delete('viewMode');

      setCategory(slug || null);
      queryClient.invalidateQueries({
        queryKey: ['knowledge', 'categories', slug || null],
        refetchType: 'active',
      });

      // Use the replace option to prevent adding to history stack
      // and the scroll option to prevent scrolling to top
      router.replace(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, queryClient, router, searchParams, setCategory]
  );

  if (isPending) {
    return (
      <div className='mx-auto flex max-w-5xl justify-center gap-2 overflow-x-auto px-4 py-8'>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 rounded-lg' />
        ))}
      </div>
    );
  }

  return (
    <nav className='mx-auto flex max-w-5xl justify-center gap-3 overflow-x-auto px-4 py-8'>
      <Button
        variant='outline'
        onClick={() => handleCategorySelect()}
        className={cn(
          'min-w-[80px] rounded-lg border-zinc-700/50 bg-zinc-900/50 px-6 text-sm font-medium shadow-sm backdrop-blur-sm hover:bg-zinc-800/70 hover:text-white',
          !selectedCategory &&
            'border-primary/50 bg-primary/10 text-primary shadow-primary/20'
        )}
      >
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.$id}
          variant='outline'
          onClick={() => handleCategorySelect(category.slug)}
          className={cn(
            'min-w-[80px] rounded-lg border-zinc-700/50 bg-zinc-900/50 px-6 text-sm font-medium shadow-sm backdrop-blur-sm hover:bg-zinc-800/70 hover:text-white',
            selectedCategory === category.slug &&
              'border-primary/50 bg-primary/10 text-primary shadow-primary/20'
          )}
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
};
