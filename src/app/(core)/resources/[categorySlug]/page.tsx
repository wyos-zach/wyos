import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import { ResourceGrid } from '@/components/core/resources/ResourceGrid';
import type { ResourceEntry } from '@/types/core/resources/entry';
import { PageHeader } from '@/components/shared/layout/PageHeader';

export default async function ResourceCategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  try {
    // Fetch the resource category using its slug.
    const category = await ResourceService.getCategoryBySlug(params.categorySlug);
    if (!category) return notFound();

    // Find entries that have this resource category ID in their resourcesCategoryIds array
    const response = await ResourceService.listResourceEntries({
      categoryId: category.$id,
    });

    const initialData = {
      documents: response.documents as ResourceEntry[],
      total: response.total,
      hasMore: response.total > 1 * 9,
      nextPage: 2,
    };

    return (
      <div className="space-y-12">
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
