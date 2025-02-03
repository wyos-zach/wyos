import { Suspense } from 'react';
import { KnowledgeService } from '@/models/server/knowledge';
import { PageHeader } from '@/components/shared/layout/PageHeader';
import { KnowledgeCategoryGrid } from '@/components/core/knowledge/KnowledgeCategoryGrid';
import { FeaturedKnowledge } from '@/components/core/knowledge/FeaturedKnowledge';
import KnowledgeLoading from './loading';

export default async function KnowledgePage() {
  return (
    <>
      {/* Hero Section */}
      <PageHeader
        title='Knowledge Hub'
        description='Curated wisdom for intentional living'
        pattern='dots'
        size='large'
        align='center'
      />

      {/* Introduction */}
      <section className='mx-auto mb-16 max-w-3xl space-y-6 text-center'>
        <p className='text-lg leading-relaxed text-muted-foreground'>
          Welcome to the WYOS Knowledge Hub—a carefully curated collection of
          practical wisdom and actionable insights. Here, you'll find authentic,
          no-fluff resources designed to help you navigate your personal growth
          journey.
        </p>
        <p className='text-lg leading-relaxed text-muted-foreground'>
          Each category represents a crucial area of development, packed with
          expert insights, real-world experiences, and practical tools you can
          apply immediately.
        </p>
      </section>

      {/* Main Content */}
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
  const categories = await KnowledgeService.getMainCategories();
  return categories
    .filter((category) => category.isActive)
    .map((category) => ({
      categorySlug: category.slug,
    }));
}
