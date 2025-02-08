import type { ResourceEntry } from '@/types/core/resources/entry';
import type { ResourceCategory } from '@/types/core/resources/category';
import {
  db,
  resourcesCollection,
  resourceCategoriesCollection,
} from '@/models/name';
import { AppwriteBaseRepository } from '@/lib/repositories/core/appwrite-base.repository';
import type { Models } from 'appwrite';
import { Query } from 'appwrite';

export class ResourceRepository extends AppwriteBaseRepository<ResourceEntry> {
  constructor() {
    super(db, resourcesCollection);
  }

  protected mapDocument(document: Models.Document): ResourceEntry {
    return {
      $id: document.$id,
      title: document.title,
      slug: document.slug,
      type: document.type,
      summary: document.summary,
      content: document.content,
      imageUrl: document.imageUrl,
      featured: document.featured,
      categoryId: document.categoryId,
      categorySlug: document.categorySlug,
      $createdAt: document.$createdAt,
      $updatedAt: document.$updatedAt,
      $permissions: document.$permissions,
    };
  }

  async listFeaturedEntries(limit = 3): Promise<ResourceEntry[]> {
    const result = await this.findAll({
      queries: [
        Query.equal('featured', true),
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
      ],
    });
    return result.documents;
  }
}

export class ResourceCategoryRepository extends AppwriteBaseRepository<ResourceCategory> {
  constructor() {
    super(db, resourceCategoriesCollection);
  }

  protected mapDocument(document: Models.Document): ResourceCategory {
    return {
      $id: document.$id,
      name: document.name,
      slug: document.slug,
      description: document.description,
      imageUrl: document.imageUrl,
      iconUrl: document.iconUrl,
      mainCategoryId: document.mainCategoryId,
      order: document.order,
      isActive: document.isActive,
      type: document.type,
      $createdAt: document.$createdAt,
      $updatedAt: document.$updatedAt,
    };
  }

  async listActiveCategories(): Promise<ResourceCategory[]> {
    const result = await this.findAll({
      queries: [Query.equal('isActive', true), Query.orderAsc('order')],
    });
    return result.documents;
  }
}
