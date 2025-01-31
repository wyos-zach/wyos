'use client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function InfiniteGrid({
  children,
  hasMore,
  isFetching,
  fetchNextAction,
}: {
  children: React.ReactNode;
  hasMore?: boolean;
  isFetching: boolean;
  fetchNextAction: () => void;
}) {
  return (
    <div className='space-y-8'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>{children}</div>

      {hasMore && (
        <div className='flex justify-center'>
          <Button
            onClick={fetchNextAction}
            disabled={isFetching}
            variant='outline'
            className='gap-2'
          >
            {isFetching ? <Loader2 className='h-4 w-4 animate-spin' /> : null}
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
