'use client';

import { useQuery } from '@tanstack/react-query';
import { KnowledgeService } from '@/models/server/knowledge';
import { EnhancedKnowledgeCategoryCard } from '@/components/core/knowledge/EnhancedKnowledgeCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export const EnhancedKnowledgeCategoryGrid = () => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const setIsFetching = useKnowledgeStore((state) => state.setIsFetching);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['knowledge', 'categories', categorySlug],
    queryFn: async () => {
      try {
        if (categorySlug) {
          // Get main category first
          const mainCategory =
            await KnowledgeService.getMainCategoryBySlug(categorySlug);

          // Then get its subcategories
          const subcategories = await KnowledgeService.getSubcategories(
            mainCategory.$id
          );
          return subcategories;
        } else {
          // If no category selected, get all knowledge categories
          const allCategories = await KnowledgeService.getKnowledgeCategories();
          return allCategories;
        }
      } catch (err) {
        console.error('Error in EnhancedKnowledgeCategoryGrid:', err);
        throw err;
      }
    },
  });

  // Update isFetching state in store
  useEffect(() => {
    setIsFetching(isLoading);
  }, [isLoading, setIsFetching]);

  // Section title component with heading font
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'font-heading text-3xl font-bold tracking-tight md:text-4xl',
        'bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent'
      )}
    >
      {children}
    </motion.h2>
  );

  if (error) {
    return (
      <div className='space-y-6'>
        <SectionTitle>Explore Categories</SectionTitle>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : 'Failed to load knowledge categories'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='h-[400px] animate-pulse rounded-xl bg-zinc-800/50'
          />
        ))}
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className='space-y-6'>
        <SectionTitle>Explore Categories</SectionTitle>
        <Alert>
          <AlertDescription>No knowledge categories found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className='h-full'
        >
          <EnhancedKnowledgeCategoryCard
            category={category}
            className='card-3d hover-glow h-full'
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
