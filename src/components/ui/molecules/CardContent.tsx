'use client';

import { CardCTA } from '@/components/ui/atoms/CardCTA';
import { CardDescription } from '@/components/ui/atoms/CardDescription';
import { CardTitle } from '@/components/ui/atoms/CardTitle';
import { cn } from '@/lib/utils';

interface CardContentProps {
  title: string;
  description?: string;
  type: 'knowledge' | 'resources';
  className?: string;
}

export const CardContent = ({
  title,
  description,
  type,
  className,
}: CardContentProps) => {
  return (
    <div className={cn('flex flex-1 flex-col p-4', className)}>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
      <div className='mt-auto pt-3'>
        <CardCTA>{`Explore ${type}`}</CardCTA>
      </div>
    </div>
  );
};
