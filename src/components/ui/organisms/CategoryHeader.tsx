'use client';

import { Badge } from '@/components/ui/atoms/Badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/atoms/Breadcrumb';
import { cn } from '@/lib/utils';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';
import type { ResourceCategory } from '@/types/core/resources/category';
import { motion } from 'motion/react';

interface CategoryHeaderProps {
  category: KnowledgeCategory | ResourceCategory;
  totalEntries: number;
  parentLink: string;
  parentLabel: string;
  label: string;
  className?: string;
}

export const CategoryHeader = ({
  category,
  totalEntries,
  parentLink,
  parentLabel,
  label,
  className,
}: CategoryHeaderProps) => {
  return (
    <header
      className={cn(
        'relative w-full bg-gradient-to-b from-background/95 to-background py-6 md:py-8',
        className
      )}
    >
      <div className='absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.01)] to-transparent' />

      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full'
        >
          <Breadcrumb className='text-xs'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={parentLink}>{parentLabel}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className='gradient-text mt-2 font-heading text-4xl font-bold tracking-tight md:text-5xl'>
            {category.name}
          </h1>

          {category.description && (
            <p className='mt-3 text-sm text-muted-foreground md:text-base'>
              {category.description}
            </p>
          )}

          <div className='mt-4'>
            <Badge variant='default' className='text-xs'>
              {totalEntries} curated {label}
            </Badge>
          </div>
        </motion.div>
      </div>
    </header>
  );
};
