import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeGrid } from '@/components/core/knowledge/KnowledgeGrid';
import { CategoryHeader } from '@/components/core/knowledge/CategoryHeader';
import type { KnowledgeEntry } from '@/types/core/knowledge';

interface Props {
  params: {
    categorySlug: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = params;
  console.log('Fetching category for slug:', categorySlug);

  try {
    // Fetch the knowledge category using its slug.
    const category = await KnowledgeService.getCategoryBySlug(categorySlug);
    console.log('Category result:', category);
    if (!category) {
      console.log('Category not found, returning 404');
      return notFound();
    }

    // Fetch the entries for that category using its ID.
    const response = await KnowledgeService.listKnowledgeEntries({
      categoryId: category.$id,
    });
    console.log('Entries response:', response);
    if (!response.documents.length) {
      console.log('No entries found, returning 404');
      return notFound();
    }

    const initialData = {
      documents: response.documents as KnowledgeEntry[],
      total: response.total,
      hasMore: response.documents.length === 9,
      nextPage: 2,
    };

    return (
      <div className='space-y-12'>
        <CategoryHeader category={category} totalEntries={response.total} />
        <KnowledgeGrid
          initialData={initialData}
          categorySlug={categorySlug}
        />
      </div>
    );
  } catch (error) {
    console.error('Category page error:', error);
    return notFound();
  }
}
