import { Suspense } from 'react';
import { KnowledgeService } from '@/models/server/knowledge';
import { PageHeader } from '@/components/shared/layout/PageHeader';
import { KnowledgeCategoryGrid } from '@/components/core/knowledge/KnowledgeCategoryGrid';
import { FeaturedKnowledge } from '@/components/core/knowledge/FeaturedKnowledge';
import KnowledgeLoading from './loading';

export default async function KnowledgePage() {
  return (
    <>
      <section className='space-y-16'>
        <PageHeader
          title='Curated Wisdom Repository'
          description='Expert insights and practical resources for intentional living'
          align='center'
        />

        <Suspense fallback={<KnowledgeLoading />}>
          <div className='space-y-20'>
            <KnowledgeCategoryGrid />
            <FeaturedKnowledge />
          </div>
        </Suspense>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const categories = await KnowledgeService.getMainCategories();
  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}
