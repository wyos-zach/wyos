// src/types/core/knowledge/entry.ts
import { KnowledgeCategory } from './category';

export interface KnowledgeEntry {
  $id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  // This field is set from Appwrite's "knowledgeCategoryId"
  categoryId: string;
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
