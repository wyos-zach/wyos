import { Suspense } from 'react';
import { KnowledgeGrid } from '@/components/knowledge/content/KnowledgeGrid';
import { CategoryNav } from '@/components/knowledge/navigation/CategoryNav';
import { SearchBar } from '@/components/knowledge/navigation/SearchBar';
import { FilterPanel } from '@/components/knowledge/filters/FilterPanel';
import { Skeleton } from '@/components/ui/skeleton';

export default async function KnowledgePage() {
  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <SearchBar />
          <FilterPanel />
        </div>
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryNav />
        </Suspense>
      </div>
      <Suspense fallback={<KnowledgeGridSkeleton />}>
        <KnowledgeGrid />
      </Suspense>
    </section>
  );
}

function CategorySkeleton() {
  return (
    <div className='flex gap-4 overflow-x-auto pb-2'>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className='h-10 w-24 flex-shrink-0' />
      ))}
    </div>
  );
}

function KnowledgeGridSkeleton() {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className='h-[300px] w-full rounded-lg' />
      ))}
    </div>
  );
}
