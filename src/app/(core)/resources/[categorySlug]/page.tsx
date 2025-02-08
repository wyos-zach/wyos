import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import { ResourceGrid } from '@/components/core/resources/ResourceGrid';
import { PageHeader } from '@/components/shared/layout/PageHeader';

// Declare params as a Promise carrying our URL parameter.
export default async function ResourceCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  try {
    const category = await ResourceService.getCategoryBySlug(categorySlug);
    if (!category) return notFound();

    const response = await ResourceService.listResourceEntries({
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
        <PageHeader
          title={category.name}
          description={category.description}
          pattern='dots'
          align='left'
        />
        <ResourceGrid initialData={initialData} />
      </div>
    );
  } catch (error) {
    console.error('Error in ResourceCategoryPage:', error);
    throw error;
  }
}
