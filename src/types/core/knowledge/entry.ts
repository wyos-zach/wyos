import type { KnowledgeCategory } from './category';

export interface KnowledgeEntry {
  $id: string;
  title: string;
  slug: string;
  type: string; // Article, Video, HowTo, Infographic
  summary: string;
  content: string;
  categoryId: string;
  categorySlug: string;
  featured: boolean;
  imageUrl?: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

export interface KnowledgeEntryWithRelations extends KnowledgeEntry {
  category?: KnowledgeCategory;
  relatedEntries?: KnowledgeEntry[];
}
