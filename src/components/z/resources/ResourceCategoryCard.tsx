'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/design-system/atoms/card';
import { cn } from '@/lib/utils';
import type { ResourceCategory } from '@/types/core/resources/category';
import Link from 'next/link';

interface ResourceCategoryCardProps {
  category: ResourceCategory;
  className?: string;
}

export const ResourceCategoryCard = ({
  category,
  className,
}: ResourceCategoryCardProps) => {
  return (
    <Link href={`/resources/${category.slug}`}>
      <Card className={cn('group h-full cursor-pointer', className)}>
        <CardHeader>
          <CardTitle className='line-clamp-2'>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {category.description && (
            <p className='line-clamp-3 text-sm text-muted-foreground'>
              {category.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
