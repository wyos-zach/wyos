import { Suspense } from 'react';
import { KnowledgeService } from '@/models/server/knowledge';
import { PageHeader } from '@/components/shared/layout/PageHeader';
import { KnowledgeCategoryGrid } from '@/components/core/knowledge/KnowledgeCategoryGrid';
import { FeaturedKnowledge } from '@/components/core/knowledge/FeaturedKnowledge';
import { IntroductionSection } from '@/components/core/knowledge/IntroductionSection';
import { CategoryNav } from '@/components/core/knowledge/CategoryNav';
import KnowledgeLoading from './loading';

export default async function KnowledgePage() {
  return (
    <>
      <PageHeader
        title='Knowledge Hub'
        description='Curated wisdom for intentional living'
        pattern='dots'
        size='large'
        align='center'
      />
      <IntroductionSection />
      <CategoryNav />
      <Suspense fallback={<KnowledgeLoading />}>
        <div className='space-y-20'>
          <KnowledgeCategoryGrid />
          <FeaturedKnowledge />
        </div>
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const categories = await KnowledgeService.getKnowledgeCategories();
  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}
