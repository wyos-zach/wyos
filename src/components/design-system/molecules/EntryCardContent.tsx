'use client';

import { CardCTA } from '@/components/design-system/atoms/CardCTA';
import { CardDescription } from '@/components/design-system/atoms/CardDescription';
import { CardTitle } from '@/components/design-system/atoms/CardTitle';
import { cn } from '@/lib/utils';

interface EntryCardContentProps {
  date?: string; // Make date optional since resources don't have dates
  title: string;
  summary?: string;
  type: 'knowledge' | 'resources';
  className?: string;
}

export const EntryCardContent = ({
  date,
  title,
  summary,
  type,
  className,
}: EntryCardContentProps) => {
  return (
    <div className={cn('flex flex-1 flex-col p-4', className)}>
      {date && type === 'knowledge' && (
        <div className='mb-2 flex items-center justify-between gap-2 text-sm text-muted-foreground'>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>
      )}
      <CardTitle>{title}</CardTitle>
      {summary && <CardDescription>{summary}</CardDescription>}
      <div className='mt-auto pt-3'>
        <CardCTA>Read More</CardCTA>
      </div>
    </div>
  );
};
