import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeGrid } from '@/components/core/knowledge/KnowledgeGrid';
import type { KnowledgeEntry } from '@/types/core/knowledge';

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  try {
    const response = await KnowledgeService.listKnowledgeEntries({
      categoryId: params.categorySlug,
    });

    if (!response.documents.length) {
      return notFound();
    }

    const initialData = {
      documents: response.documents as unknown as KnowledgeEntry[],
      total: response.total,
      hasMore: response.documents.length === 9,
      nextPage: 2,
    };

    return (
      <section className='space-y-8'>
        <h1 className='text-3xl font-bold'>{params.categorySlug}</h1>
        <KnowledgeGrid
          initialData={initialData}
          categorySlug={params.categorySlug}
        />
      </section>
    );
  } catch (error) {
    return notFound();
  }
}
