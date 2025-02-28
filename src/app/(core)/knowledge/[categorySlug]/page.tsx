import { KnowledgeService } from '@/models/server/knowledge';
import { EnhancedKnowledgeGrid } from '@/components/core/knowledge/EnhancedKnowledgeGrid';
import { EnhancedCategoryHeader } from '@/components/core/knowledge/EnhancedCategoryHeader';
import type { KnowledgeEntry } from '@/types/core/knowledge';

// Declare that params is a Promise carrying our URL parameter.
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  try {
    const category = await KnowledgeService.getCategoryBySlug(categorySlug);
    if (!category) {
      return (
        <div className='mx-auto max-w-3xl px-4 py-8'>
          <h1>Category Not Found</h1>
          <p>
            We couldn&apos;t find any information for the category "
            {categorySlug}".
          </p>
        </div>
      );
    }

    const response = await KnowledgeService.listKnowledgeEntries({
      categoryId: category.$id,
    });

    const initialData = {
      documents: response.documents as KnowledgeEntry[],
      total: response.total,
      hasMore: response.total > 9,
      nextPage: 2,
    };

    return (
      <div className='space-y-12'>
        <EnhancedCategoryHeader
          category={category}
          totalEntries={response.total}
        />
        <EnhancedKnowledgeGrid
          initialData={initialData}
          categorySlug={categorySlug}
        />
      </div>
    );
  } catch (error) {
    console.error('Error in KnowledgeCategoryPage:', error);
    return (
      <div className='mx-auto max-w-3xl px-4 py-8'>
        <h1>Error Loading Category</h1>
        <p>There was an error loading this category. Please try again later.</p>
      </div>
    );
  }
}
