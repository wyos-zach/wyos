import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import { ResourceGrid } from '@/components/core/resources/ResourceGrid';
import type { ResourceEntry } from '@/types/core/resources/entry';

export default async function ResourceCategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  try {
    const response = await ResourceService.listResourceEntries({
      categoryId: params.categorySlug,
    });
    if (!response.documents.length) return notFound();
    const initialData = {
      documents: response.documents as ResourceEntry[],
      total: response.total,
      hasMore: response.documents.length === 9,
      nextPage: 2,
    };
    return (
      <section className='space-y-8'>
        <h1 className='text-3xl font-bold'>{params.categorySlug}</h1>
        <ResourceGrid
          initialData={initialData}
          categorySlug={params.categorySlug}
        />
      </section>
    );
  } catch (error) {
    return notFound();
  }
}
