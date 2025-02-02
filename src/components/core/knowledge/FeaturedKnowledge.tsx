'use client';
import { useQuery } from '@tanstack/react-query';
import { KnowledgeCard } from './KnowledgeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeEntry } from '@/types/core/knowledge';

export const FeaturedKnowledge = () => {
  const { data, isPending } = useQuery({
    queryKey: ['knowledge', 'featured'],
    queryFn: () => KnowledgeService.listFeaturedEntries(3),
  });

  if (isPending) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  return (
    <section>
      <h2 className='mb-6 text-2xl font-bold'>Featured Content</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((entry: KnowledgeEntry) => (
          <KnowledgeCard key={entry.$id} entry={entry} />
        ))}
      </div>
    </section>
  );
};
