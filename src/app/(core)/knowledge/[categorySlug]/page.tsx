import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeGrid } from '@/components/core/knowledge/KnowledgeGrid';
import { CategoryHeader } from '@/components/core/knowledge/CategoryHeader';

// Declare that params is a Promise carrying our URL parameter.
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  try {
    const category = await KnowledgeService.getCategoryBySlug(categorySlug);
    if (!category) return notFound();

    const response = await KnowledgeService.listKnowledgeEntries({
      categoryId: category.$id,
    });

    const initialData = {
      documents: response.documents,
      total: response.total,
      hasMore: response.total > 9,
      nextPage: 2,
    };

    return (
      <div className='space-y-12'>
        <CategoryHeader category={category} totalEntries={response.total} />
        <KnowledgeGrid initialData={initialData} categorySlug={categorySlug} />
      </div>
    );
  } catch (error) {
    console.error('Error in KnowledgeCategoryPage:', error);
    throw error;
  }
}
