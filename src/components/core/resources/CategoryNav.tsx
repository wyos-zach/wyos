'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useResourcesStore } from '@/store/useResourcesStore';
import { ResourceService } from '@/models/server/resources';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const CategoryNav = () => {
  const { selectedCategory, setCategory } = useResourcesStore();
  const { data: categories, isPending } = useQuery({
    queryKey: ['resources', 'main-categories'],
    queryFn: () => ResourceService.getMainCategories(),
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Sync URL with store on mount
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && urlCategory !== selectedCategory) {
      setCategory(urlCategory);
    }
  });

  const handleCategorySelect = (slug?: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (slug) {
      newSearchParams.set('category', slug);
    } else {
      newSearchParams.delete('category');
    }

    // Clear other store-related params
    newSearchParams.delete('resources-store');
    newSearchParams.delete('sortBy');
    newSearchParams.delete('viewMode');

    setCategory(slug || null);
    queryClient.invalidateQueries({
      queryKey: ['resources', 'entries'],
      refetchType: 'active',
    });
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  if (isPending) {
    return (
      <div className='flex gap-2'>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 rounded-md' />
        ))}
      </div>
    );
  }

  return (
    <nav className='mb-8 flex gap-2 overflow-x-auto'>
      <Button
        variant={!selectedCategory ? 'default' : 'outline'}
        onClick={() => handleCategorySelect()}
        className='min-w-[80px]'
      >
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.$id}
          variant={selectedCategory === category.slug ? 'default' : 'outline'}
          onClick={() => handleCategorySelect(category.slug)}
          className='min-w-[80px]'
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
};
