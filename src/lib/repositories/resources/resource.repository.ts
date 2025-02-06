import type { ResourceEntry } from '@/types/core/resources/entry';
import {
  resourcesCollection,
  resourceCategoriesCollection,
  db,
} from '@/models/name';
import { AppwriteBaseRepository } from '@/lib/repositories/core/appwrite-base.repository';
import type { ResourceCategory } from '@/types/core/resources/category';

export class ResourceEntryRepository extends AppwriteBaseRepository<ResourceEntry> {
  constructor() {
    super(db, resourcesCollection);
  }

  protected mapDocument(document: any): ResourceEntry {
    return {
      $id: document.$id,
      title: document.title,
      slug: document.slug,
      type: document.type, // e.g. 'app', 'book', etc.
      summary: document.summary,
      content: document.content,
      featured: document.featured,
      imageUrl: document.imageUrl,
      // Assume resource categories are stored as an array; we take the first element
      categoryId:
        Array.isArray(document.resourceCategoryIds) &&
        document.resourceCategoryIds.length > 0
          ? document.resourceCategoryIds[0]
          : '',
      // categorySlug will be enriched via the service
      categorySlug: document.resourceCategorySlug || '',
      $createdAt: new Date(document.$createdAt).toISOString(),
      $updatedAt: new Date(document.$updatedAt).toISOString(),
      $permissions: document.$permissions,
    };
  }

  async listFeaturedEntries(limit: number = 3): Promise<ResourceEntry[]> {
    const result = await this.findAll(
      { featured: true },
      {
        queries: ['orderDesc($createdAt)', `limit(${limit})`],
      }
    );
    return result.documents;
  }
}
export class ResourceCategoryRepository extends AppwriteBaseRepository<ResourceCategory> {
  constructor() {
    super(db, resourceCategoriesCollection);
  }

  protected mapDocument(document: any): ResourceCategory {
    return {
      $id: document.$id,
      name: document.name,
      slug: document.slug,
      description: document.description,
      isActive: document.isActive,
      imageUrl: document.imageUrl,
      icon: document.icon,
      $createdAt: new Date(document.$createdAt).toISOString(),
      $updatedAt: new Date(document.$updatedAt).toISOString(),
    };
  }

  async listActiveCategories(): Promise<ResourceCategory[]> {
    const result = await this.findAll(
      { isActive: true },
      {
        queries: ['orderAsc(name)'],
      }
    );
    return result.documents;
  }
}
