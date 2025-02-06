import { Skeleton } from '@/components/ui/skeleton';

export const ResourceCardSkeleton = () => (
  <div className='flex flex-col gap-3 rounded-lg border p-6'>
    <Skeleton className='h-4 w-1/2' />
    <Skeleton className='h-6 w-3/4' />
    <div className='space-y-2'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-2/3' />
    </div>
    <Skeleton className='mt-4 aspect-video w-full rounded-md' />
  </div>
);
