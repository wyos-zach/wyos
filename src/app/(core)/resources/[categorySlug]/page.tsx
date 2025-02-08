import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeGrid } from '@/components/core/knowledge/KnowledgeGrid';
import { CategoryHeader } from '@/components/core/knowledge/CategoryHeader';
import type { KnowledgeEntry } from '@/types/core/knowledge';

export default async function KnowledgeCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  try {
    // Fetch the category using its slug.
    const category = await KnowledgeService.getCategoryBySlug(categorySlug);
    if (!category) {
      return (
        <div className='mx-auto max-w-3xl px-4 py-8'>
          <h1>Category Not Found</h1>
          <p>
            We couldn’t find any information for the category:{' '}
            <strong>{categorySlug}</strong>.
          </p>
        </div>
      );
    }

    // Fetch the knowledge entries that belong to this category using its $id.
    const response = await KnowledgeService.listKnowledgeEntries({
      categoryId: category.$id,
    });

    // If no entries are found, show a friendly message.
    if (response.total === 0) {
      return (
        <div className='mx-auto max-w-3xl px-4 py-8'>
          <h1>No Entries Found</h1>
          <p>
            There are no knowledge entries in the category:{' '}
            <strong>{category.name}</strong>.
          </p>
        </div>
      );
    }

    const initialData = {
      documents: response.documents as KnowledgeEntry[],
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
    return (
      <div className='mx-auto max-w-3xl px-4 py-8'>
        <h1>Error Loading Category</h1>
        <p>There was an error loading this category. Please try again later.</p>
      </div>
    );
  }
}
