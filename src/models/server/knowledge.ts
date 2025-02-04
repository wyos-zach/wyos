import { Query } from 'appwrite';
import { databases } from '@/models/client/config';
import {
  db,
  mainCategoriesCollection,
  knowledgeCategoriesCollection,
  knowledgeCollection,
} from '@/models/name';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import type { PaginatedResult } from '@/types/core/knowledge/query';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';

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
async function getCategorySlugById(categoryId: string): Promise<string> {
  try {
    const catResponse = await databases.listDocuments(
      db,
      knowledgeCategoriesCollection,
      [Query.equal('$id', categoryId), Query.select(['slug']), Query.limit(1)]
    );
    if (catResponse.documents.length > 0) {
      const catDoc = catResponse.documents[0] as unknown as KnowledgeCategory;
      return catDoc.slug;
    }
    return 'uncategorized';
  } catch (error) {
    console.error('getCategorySlugById error:', error);
    return 'uncategorized';
  }
}

export const KnowledgeService = {
  async getMainCategories(): Promise<KnowledgeCategory[]> {
    try {
      const response = await databases.listDocuments(
        db,
        mainCategoriesCollection,
        [Query.equal('isActive', true), Query.orderAsc('order')]
      );
      return response.documents as unknown as KnowledgeCategory[];
    } catch (error) {
      throw new KnowledgeError(500, 'Failed to fetch main categories');
    }
  },

  /**
   * Fetch subcategories (i.e. knowledge categories that belong to a given main category).
   * Uses the "mainCategoryId" field in the knowledge-categories collection.
   */
  async getSubcategories(mainCategoryId: string): Promise<KnowledgeCategory[]> {
    try {
      const response = await databases.listDocuments(
        db,
        knowledgeCategoriesCollection,
        [
          Query.equal('mainCategoryId', mainCategoryId),
          Query.equal('isActive', true),
          Query.orderAsc('order'),
        ]
      );
      return response.documents as unknown as KnowledgeCategory[];
    } catch (error) {
      throw new KnowledgeError(500, 'Failed to fetch subcategories');
    }
  },

  /** Fetch all knowledge categories. */
  async getKnowledgeCategories(): Promise<KnowledgeCategory[]> {
    try {
      const response = await databases.listDocuments(
        db,
        knowledgeCategoriesCollection,
        [
          Query.equal('isActive', [true]),
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
      return response.documents as unknown as KnowledgeCategory[];
    } catch (error) {
      console.error('Failed to fetch knowledge categories:', error);
      throw new KnowledgeError(500, 'Failed to fetch knowledge categories');
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
      const queries = [
        ...(categoryId
          ? [Query.equal('knowledgeCategoryIds', categoryId)]
          : []),
        ...(searchQuery ? [Query.search('title', searchQuery)] : []),
        Query.orderDesc('$createdAt'),
        Query.limit(pageSize),
        Query.offset((page - 1) * pageSize),
        Query.select([
          '$id',
          'title',
          'slug',
          'summary',
          'content',
          'featured',
          'imageUrl',
          'knowledgeCategoryIds',
          '$createdAt',
          '$updatedAt',
          '$permissions',
        ]),
      ];

      // Helper to get the first category from the knowledgeCategoryIds array
      const getFirstCategoryId = (doc: any): string =>
        Array.isArray(doc.knowledgeCategoryIds) &&
        doc.knowledgeCategoryIds.length > 0
          ? doc.knowledgeCategoryIds[0]
          : '';

      const response = await databases.listDocuments(
        db,
        knowledgeCollection,
        queries
      );

      const categoryIds = [
        ...new Set(
          response.documents
            .map((doc) => getFirstCategoryId(doc))
            .filter(Boolean)
        ),
      ];

      const categoryMap = Object.fromEntries(
        await Promise.all(
          categoryIds.map(async (id) => [id, await getCategorySlugById(id)])
        )
      );

      const enrichedEntries = response.documents.map((doc) => {
        const catId = getFirstCategoryId(doc);
        return {
          $id: doc.$id,
          title: doc.title,
          slug: doc.slug,
          summary: doc.summary,
          content: doc.content,
          featured: doc.featured,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
          categoryId: catId,
          categorySlug: categoryMap[catId] || 'uncategorized',
          imageUrl: doc.imageUrl || undefined,
        };
      });
      return {
        documents: enrichedEntries,
        total: response.total,
        hasMore: response.total > page * pageSize,
        nextPage: page + 1,
      };
    } catch (error) {
      console.error('KnowledgeService.listKnowledgeEntries failed:', error);
      throw new KnowledgeError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch knowledge entries'
      );
    }
  },

  async getEntryBySlug(slug: string): Promise<KnowledgeEntry> {
    try {
      const response = await databases.listDocuments(db, knowledgeCollection, [
        Query.equal('slug', slug),
        Query.limit(1),
        Query.select([
          '$id',
          'title',
          'slug',
          'summary',
          'content',
          'featured',
          'knowledgeCategoryIds',
          '$createdAt',
          '$updatedAt',
          '$permissions',
        ]),
      ]);
      if (response.documents.length === 0) {
        throw new KnowledgeError(404, 'Knowledge entry not found');
      }
      const doc = response.documents[0];
      const catId =
        Array.isArray(doc.knowledgeCategoryIds) &&
        doc.knowledgeCategoryIds.length > 0
          ? doc.knowledgeCategoryIds[0]
          : '';
      let categorySlug = 'uncategorized';
      if (catId) {
        categorySlug = await getCategorySlugById(catId);
      }
      return {
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        content: doc.content,
        featured: doc.featured,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions,
        categoryId: catId,
        categorySlug,
        imageUrl: doc.imageUrl || undefined,
      };
    } catch (error) {
      console.error('KnowledgeService.getEntryBySlug failed:', error);
      throw new KnowledgeError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch knowledge entry'
      );
    }
  },

  async listFeaturedEntries(limit: number = 3): Promise<KnowledgeEntry[]> {
    try {
      const response = await databases.listDocuments(db, knowledgeCollection, [
        Query.equal('featured', true),
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
      ]);
      const getFirstCategoryId = (doc: any): string =>
        Array.isArray(doc.knowledgeCategoryIds) &&
        doc.knowledgeCategoryIds.length > 0
          ? doc.knowledgeCategoryIds[0]
          : '';
      const categoryIds = [
        ...new Set(
          response.documents
            .map(getFirstCategoryId)
            .filter((id): id is string => Boolean(id))
        ),
      ];
      let categoryMap: Record<string, string> = {};
      for (const id of categoryIds) {
        categoryMap[id] = await getCategorySlugById(id);
      }
      const enrichedEntries = response.documents.map((doc) => {
        const catId = getFirstCategoryId(doc);
        return {
          $id: doc.$id,
          title: doc.title,
          slug: doc.slug,
          summary: doc.summary,
          content: doc.content,
          featured: doc.featured,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
          categoryId: catId,
          categorySlug: categoryMap[catId] || 'uncategorized',
          imageUrl: doc.imageUrl || undefined,
        };
      });
      return enrichedEntries;
    } catch (error) {
      console.error('Failed to fetch featured entries:', error);
      throw new KnowledgeError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch featured entries'
      );
    }
  },

  /**
   * (Optional) Fetch a specific category by its slug.
   */
  async getCategoryBySlug(slug: string): Promise<KnowledgeCategory> {
    try {
      const response = await databases.listDocuments(
        db,
        knowledgeCategoriesCollection,
        [
          Query.equal('slug', slug),
          Query.limit(1),
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
      if (response.documents.length === 0) {
        throw new KnowledgeError(404, 'Category not found');
      }
      return response.documents[0] as unknown as KnowledgeCategory;
    } catch (error) {
      throw new KnowledgeError(500, 'Failed to fetch category');
    }
  },
};
