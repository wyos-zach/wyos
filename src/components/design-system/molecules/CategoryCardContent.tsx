'use client';

import { CardCTA } from '@/components/design-system/atoms/CardCTA';
import { CardDescription } from '@/components/design-system/atoms/CardDescription';
import { CardTitle } from '@/components/design-system/atoms/CardTitle';
import { cn } from '@/lib/utils';

interface CategoryCardContentProps {
  title: string;
  description?: string;
  className?: string;
}

export const CategoryCardContent = ({
  title,
  description,
  className,
}: CategoryCardContentProps) => {
  return (
    <div className={cn('flex flex-1 flex-col p-4', className)}>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
      <div className='mt-auto pt-3'>
        <CardCTA>{`Explore ${title}`}</CardCTA>
      </div>
    </div>
  );
};
