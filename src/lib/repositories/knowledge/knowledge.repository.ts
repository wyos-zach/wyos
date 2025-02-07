import { KnowledgeCategory } from '@/types/core/knowledge/category';
import { AppwriteBaseRepository } from '../core/appwrite-base.repository';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import {
  db,
  knowledgeCollection,
  knowledgeCategoriesCollection,
} from '@/models/name';

export class KnowledgeEntryRepository extends AppwriteBaseRepository<KnowledgeEntry> {
  constructor() {
    super(db, knowledgeCollection);
  }

  protected mapDocument(document: any): KnowledgeEntry {
    return {
      $id: document.$id,
      title: document.title,
      slug: document.slug,
      type: document.type,
      summary: document.summary,
      content: document.content,
      categoryId: document.knowledgeCategoryIds ?? '',
      categorySlug:
        document.knowledgeCategorySlug ?? document.knowledgeCategoryIds ?? '',
      featured: document.featured,
      imageUrl: document.imageUrl,
      $createdAt: new Date(document.$createdAt).toISOString(),
      $updatedAt: new Date(document.$updatedAt).toISOString(),
      $permissions: document.$permissions,
    };
  }

  async listFeaturedEntries(limit = 3): Promise<KnowledgeEntry[]> {
    const result = await this.findAll(
      { featured: true },
      {
        queries: ['orderDesc($createdAt)', `limit(${limit})`],
      }
    );
    return result.documents;
  }
}

export class KnowledgeCategoryRepository extends AppwriteBaseRepository<KnowledgeCategory> {
  constructor() {
    super(db, knowledgeCategoriesCollection);
  }

  protected mapDocument(document: any): KnowledgeCategory {
    return {
      $id: document.$id,
      name: document.name,
      slug: document.slug,
      description: document.description,
      order: document.order,
      isActive: document.isActive,
      iconUrl: document.iconUrl,
      imageUrl: document.imageUrl,
      $createdAt: new Date(document.$createdAt).toISOString(),
      $updatedAt: new Date(document.$updatedAt).toISOString(),
    };
  }

  async listActiveCategories(): Promise<KnowledgeCategory[]> {
    const result = await this.findAll(
      { isActive: true },
      {
        queries: ['orderAsc(order)'],
      }
    );
    return result.documents;
  }
}
