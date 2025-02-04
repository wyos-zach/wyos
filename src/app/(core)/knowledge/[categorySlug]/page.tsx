import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeGrid } from '@/components/core/knowledge/KnowledgeGrid';
import { CategoryHeader } from '@/components/core/knowledge/CategoryHeader';
import type { KnowledgeEntry } from '@/types/core/knowledge';

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  try {
    const category = await KnowledgeService.getCategoryBySlug(
      params.categorySlug
    );
    if (!category) return notFound();

    const response = await KnowledgeService.listKnowledgeEntries({
      categoryId: category.$id,
    });
    if (!response.documents.length) return notFound();

    const initialData = {
      documents: response.documents as unknown as KnowledgeEntry[],
      total: response.total,
      hasMore: response.documents.length === 9,
      nextPage: 2,
    };

    return (
      <div className='min-h-screen bg-slate-950'>
        <CategoryHeader category={category} totalEntries={response.total} />
        <main className='container py-12'>
          <KnowledgeGrid
            initialData={initialData}
            categorySlug={params.categorySlug}
          />
        </main>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
