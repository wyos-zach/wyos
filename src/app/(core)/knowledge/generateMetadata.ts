import { KnowledgeService } from '@/models/server/knowledge';

export async function generateStaticParams() {
  const categories = await KnowledgeService.getKnowledgeCategories();
  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}
