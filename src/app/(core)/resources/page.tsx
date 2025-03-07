import { Suspense } from 'react';
import { ResourceService } from '@/models/server/resources';
import { ResourceCategoryGrid } from '@/components/core/resources/ResourceCategoryGrid';
import { FeaturedResources } from '@/components/core/resources/FeaturedResources';
import { CategoryNavWrapper } from '@/components/core/resources/CategoryNavWrapper';
import ResourceLoading from './loading';

export default function ResourcesPage() {
  return (
    <>
      <CategoryNavWrapper />
      <Suspense fallback={<ResourceLoading />}>
        <div className='space-y-20'>
          <ResourceCategoryGrid />
          <FeaturedResources />
        </div>
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  // Ensure that ResourceService.getResourceCategories() is implemented
  // similarly to KnowledgeService.getKnowledgeCategories()
  const categories = await ResourceService.getResourceCategories();
  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}
