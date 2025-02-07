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
    // Fetch the knowledge category using its slug.
    const category = await KnowledgeService.getCategoryBySlug(
      params.categorySlug
    );
    if (!category) return notFound();

    // Fetch the entries for that category using its ID.
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
      <div className='space-y-12'>
        <CategoryHeader category={category} totalEntries={response.total} />
        <KnowledgeGrid
          initialData={initialData}
          categorySlug={params.categorySlug}
        />
      </div>
    );
  } catch {
    return notFound();
  }
}
