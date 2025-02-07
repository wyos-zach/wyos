import { Query, type Models } from 'appwrite';
import { databases } from '@/models/client/config';
import {
  db,
  mainCategoriesCollection,
  knowledgeCategoriesCollection,
  knowledgeCollection,
} from '@/models/name';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';
import type { PaginatedResult } from '@/types/core/shared/pagination';

type KnowledgeDocument = Models.Document & KnowledgeEntry;
type KnowledgeCategoryDocument = Models.Document & KnowledgeCategory;

export class KnowledgeError extends Error {
  constructor(
    public code: number,
    message: string,
    public type: string = 'KnowledgeError'
  ) {
    super(message);
    this.name = 'KnowledgeError';
  }
}

/**
 * Helper to look up a category’s slug by its ID.
 * Returns 'uncategorized' if not found.
 */
const _getCategorySlugById = async (id: string): Promise<string> => {
  try {
    const response = await databases.listDocuments<KnowledgeDocument>(
      db,
      knowledgeCategoriesCollection,
      [Query.equal('$id', id), Query.select(['slug'])]
    );
    return response.documents[0]?.slug || 'uncategorized';
  } catch {
    return 'uncategorized';
  }
};

export const KnowledgeService = {
  async getMainCategories(): Promise<KnowledgeCategory[]> {
    try {
      const response = await databases.listDocuments<KnowledgeCategoryDocument>(
        db,
        mainCategoriesCollection,
        [Query.equal('isActive', true), Query.orderAsc('order')]
      );
      return response.documents;
    } catch {
      throw new KnowledgeError(500, 'Failed to fetch main categories');
    }
  },

  async getSubcategories(mainCategoryId: string): Promise<KnowledgeCategory[]> {
    try {
      const response = await databases.listDocuments<KnowledgeCategoryDocument>(
        db,
        knowledgeCategoriesCollection,
        [
          Query.equal('mainCategoryId', mainCategoryId),
          Query.equal('isActive', true),
          Query.orderAsc('order'),
        ]
      );
      return response.documents;
    } catch {
      throw new KnowledgeError(500, 'Failed to fetch subcategories');
    }
  },

  async getKnowledgeCategories(): Promise<KnowledgeCategory[]> {
    try {
      const response = await databases.listDocuments<KnowledgeCategoryDocument>(
        db,
        knowledgeCategoriesCollection,
        [
          Query.equal('isActive', true),
          Query.orderAsc('order'),
          Query.select([
            '$id',
            'name',
            'slug',
            'description',
            'order',
            'isActive',
            'icon',
            'imageUrl',
            'mainCategoryId',
            '$createdAt',
            '$updatedAt',
          ]),
        ]
      );
      return response.documents;
    } catch {
      return [];
    }
  },

  async listKnowledgeEntries({
    categoryId,
    searchQuery,
    page = 1,
    pageSize = 9,
  }: {
    categoryId?: string;
    searchQuery?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<KnowledgeEntry>> {
    try {
      const queries = [];

      if (categoryId) {
        queries.push(Query.equal('categoryId', categoryId));
      }

      if (searchQuery) {
        queries.push(Query.search('title', searchQuery));
      }

      queries.push(Query.limit(pageSize));
      queries.push(Query.offset((page - 1) * pageSize));

      const response = await databases.listDocuments<KnowledgeDocument>(
        db,
        knowledgeCollection,
        queries
      );

      return {
        documents: response.documents,
        total: response.total,
        hasMore: response.total > page * pageSize,
        nextPage: page + 1,
      };
    } catch {
      return {
        documents: [],
        total: 0,
        hasMore: false,
        nextPage: 1,
      };
    }
  },

  async getEntryBySlug(slug: string): Promise<KnowledgeEntry | null> {
    try {
      const response = await databases.listDocuments<KnowledgeDocument>(
        db,
        knowledgeCollection,
        [Query.equal('slug', slug)]
      );
      if (response.documents.length === 0) {
        return null;
      }
      return response.documents[0];
    } catch {
      return null;
    }
  },

  async listFeaturedEntries(): Promise<KnowledgeEntry[]> {
    try {
      const response = await databases.listDocuments<KnowledgeDocument>(
        db,
        knowledgeCollection,
        [Query.equal('featured', true), Query.limit(3)]
      );
      return response.documents;
    } catch {
      throw new KnowledgeError(500, 'Failed to fetch featured entries');
    }
  },

  async getMainCategoryBySlug(slug: string): Promise<KnowledgeCategory> {
    try {
      const response = await databases.listDocuments<KnowledgeCategoryDocument>(
        db,
        mainCategoriesCollection,
        [Query.equal('slug', slug), Query.equal('isActive', true)]
      );

      if (response.documents.length === 0) {
        throw new KnowledgeError(404, `Main category not found: ${slug}`);
      }

      return response.documents[0] as unknown as KnowledgeCategory;
    } catch {
      throw new KnowledgeError(500, `Failed to fetch main category: ${slug}`);
    }
  },

  async getCategoryBySlug(slug: string): Promise<KnowledgeCategory | null> {
    try {
      const response = await databases.listDocuments<KnowledgeCategoryDocument>(
        db,
        knowledgeCategoriesCollection,
        [Query.equal('slug', slug), Query.limit(1)]
      );
      if (response.documents.length === 0) {
        return null;
      }
      return response.documents[0] as unknown as KnowledgeCategory;
    } catch {
      return null;
    }
  },

  async updateKnowledgeEntry(id: string, data: Partial<KnowledgeEntry>): Promise<KnowledgeEntry | null> {
    try {
      const response = await databases.updateDocument<KnowledgeDocument>(
        db,
        knowledgeCollection,
        id,
        {
          ...data,
          categoryId: data.categoryId || '',
        }
      );
      return response;
    } catch {
      return null;
    }
  },
};
