'use client';

import { CardCTA } from '@/components/ui/atoms/CardCTA';
import { CardDescription } from '@/components/ui/atoms/CardDescription';
import { CardTitle } from '@/components/ui/atoms/CardTitle';
import { cn } from '@/lib/utils';

interface CardContentProps {
  date: string;
  title: string;
  summary?: string;
  type: 'knowledge' | 'resources';
  className?: string;
}

export const CardContent = ({
  date,
  title,
  summary,
  type,
  className,
}: CardContentProps) => {
  return (
    <div className={cn('flex flex-1 flex-col p-4', className)}>
      <div className='mb-2 flex items-center justify-between gap-2 text-sm text-muted-foreground'>
        <time dateTime={date}>
          {new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>
      <CardTitle>{title}</CardTitle>
      {summary && <CardDescription>{summary}</CardDescription>}
      <div className='mt-auto pt-3'>
        <CardCTA>{`Explore ${type}`}</CardCTA>
      </div>
    </div>
  );
};
