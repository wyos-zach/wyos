import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeGrid } from '@/components/core/knowledge/KnowledgeGrid';
import { CategoryHeader } from '@/components/core/knowledge/CategoryHeader';
import { SearchBar } from '@/components/core/knowledge/SearchBar';
import { FilterPanel } from '@/components/core/knowledge/FilterPanel';

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  try {
    const category = await KnowledgeService.getCategoryBySlug(
      params.categorySlug
    );
    if (!category) return notFound();

    const response = await KnowledgeService.listKnowledgeEntries({
      categoryId: category.$id,
    });
    if (!response.documents.length) return notFound();

    const initialData = {
      documents: response.documents,
      total: response.total,
      hasMore: response.documents.length === 9,
      nextPage: 2,
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='min-h-screen bg-background/95 pb-20'
      >
        <CategoryHeader category={category} totalEntries={response.total} />

        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='relative z-10 -mt-8'>
            <div className='rounded-xl bg-background/60 p-6 ring-1 ring-white/10 backdrop-blur-xl'>
              <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                <SearchBar />
                <FilterPanel />
              </div>
            </div>
          </div>

          <div className='mt-12'>
            <KnowledgeGrid
              initialData={initialData}
              categorySlug={params.categorySlug}
            />
          </div>
        </div>
      </motion.div>
    );
  } catch (error) {
    return notFound();
  }
}
