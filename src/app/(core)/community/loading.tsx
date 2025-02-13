import { Skeleton } from '@/components/ui/skeleton';

export default function CommunityLoading() {
  return (
    <div className='space-y-8'>
      <Skeleton className='h-8 w-1/2 rounded-lg' />
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-4 w-full rounded-lg' />
        ))}
      </div>
      <Skeleton className='h-12 w-48 rounded-lg' />
    </div>
  );
}
