'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useResourcesStore } from '@/store/useResourcesStore';
import { ResourceService } from '@/models/server/resources';
import { useRouter, usePathname } from 'next/navigation';

export const CategoryNav = () => {
  const { selectedCategory, setCategory } = useResourcesStore();
  const { data: categories, isPending } = useQuery({
    queryKey: ['resources', 'main-categories'],
    queryFn: () => ResourceService.getMainCategories(),
    staleTime: 60 * 1000,
  });
  const router = useRouter();
  const pathname = usePathname();

  const handleCategorySelect = async (slug?: string) => {
    // Update store with slug
    await setCategory(slug || null);

    // Update URL with slug
    const searchParams = new URLSearchParams(window.location.search);
    if (slug) {
      searchParams.set('category', slug);
    } else {
      searchParams.delete('category');
    }
    router.push(`${pathname}?${searchParams.toString()}`);
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
