import { Suspense } from 'react';
import { ResourceService } from '@/models/server/resources';
import { PageHeader } from '@/components/shared/layout/PageHeader';
import { ResourceCategoryGrid } from '@/components/core/resources/ResourceCategoryGrid';
import { FeaturedResources } from '@/components/core/resources/FeaturedResources';
import { CategoryNav } from '@/components/core/resources/CategoryNav';
import ResourceLoading from './loading';

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        title='Resources'
        description='Curated resources for personal and professional growth'
        pattern='dots'
        size='large'
        align='center'
      />
      <CategoryNav />
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
