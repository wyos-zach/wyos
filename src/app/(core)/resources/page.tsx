import { CategoryNavWrapper } from '@/components/z/resources/CategoryNavWrapper';
import { FeaturedResources } from '@/components/z/resources/FeaturedResources';
import { ResourceCategoryGrid } from '@/components/z/resources/ResourceCategoryGrid';
import { ResourceService } from '@/models/server/resources';
import { Suspense } from 'react';
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
