import { Skeleton } from '@/components/design-system/atoms/skeleton';

export default function KnowledgeLoading() {
  return (
    <div className='space-y-20'>
      {/* Category Grid Loading */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className='aspect-video rounded-xl' />
        ))}
      </div>

      {/* Featured Loading */}
      <div className='space-y-8'>
        <Skeleton className='h-8 w-1/4 rounded-lg' />
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className='h-64 rounded-xl' />
          ))}
        </div>
      </div>
    </div>
  );
}
