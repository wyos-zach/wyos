'use client';
import { useQuery } from '@tanstack/react-query';
import { KnowledgeCard } from './KnowledgeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { KnowledgeService } from '@/models/server/knowledge';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

export const FeaturedKnowledge = () => {
  const { data, isLoading, error } = useQuery<KnowledgeEntry[]>({
    queryKey: ['knowledge', 'featured'],
    queryFn: () => KnowledgeService.listFeaturedEntries(3),
  });

  if (isLoading) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className='text-red-500'>Failed to load featured content.</p>;
  }

  return (
    <section className='space-y-6'>
      <h2 className='text-2xl font-bold'>Featured Content</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((entry) => <KnowledgeCard key={entry.$id} entry={entry} />)}
      </div>
    </section>
  );
};
