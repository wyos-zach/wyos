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
        queries.push(Query.equal('knowledgeCategoryIds', categoryId));
      }
      if (searchQuery) {
        queries.push(Query.search('title', searchQuery));
      }
      const response = await databases.listDocuments(db, knowledgeCollection, [
        ...queries,
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
      ]);

      // Helper: extract first category ID from the array
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

      let categoryMap: Record<string, KnowledgeCategory> = {};
      if (categoryIds.length) {
        const catResponse = await databases.listDocuments(
          db,
          knowledgeCategoriesCollection,
          [Query.equal('$id', categoryIds), Query.select(['$id', 'slug'])]
        );
        categoryMap = catResponse.documents.reduce(
          (acc, doc) => {
            acc[doc.$id] = doc as unknown as KnowledgeCategory;
            return acc;
          },
          {} as Record<string, KnowledgeCategory>
        );
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
          imageUrl: doc.imageUrl,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
          categoryId: catId,
          categorySlug: categoryMap[catId]?.slug || 'uncategorized',
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
          'imageUrl',
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
        const catResponse = await databases.listDocuments(
          db,
          knowledgeCategoriesCollection,
          [Query.equal('$id', [catId]), Query.select(['slug']), Query.limit(1)]
        );
        if (catResponse.documents.length > 0) {
          categorySlug = (
            catResponse.documents[0] as unknown as KnowledgeCategory
          ).slug;
        }
      }

      return {
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        content: doc.content,
        featured: doc.featured,
        imageUrl: doc.imageUrl,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions,
        categoryId: catId,
        categorySlug,
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

      // Enrich featured entries the same way as listKnowledgeEntries
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

      let categoryMap: Record<string, KnowledgeCategory> = {};
      if (categoryIds.length) {
        const catResponse = await databases.listDocuments(
          db,
          knowledgeCategoriesCollection,
          [Query.equal('$id', categoryIds), Query.select(['$id', 'slug'])]
        );
        categoryMap = catResponse.documents.reduce(
          (acc, doc) => {
            acc[doc.$id] = doc as unknown as KnowledgeCategory;
            return acc;
          },
          {} as Record<string, KnowledgeCategory>
        );
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
          imageUrl: doc.imageUrl,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
          categoryId: catId,
          categorySlug: categoryMap[catId]?.slug || 'uncategorized',
        };
      });
      return enrichedEntries;
    } catch (error) {
      console.error('Failed to fetch featured entries:', error);
      throw new Error('Could not fetch featured entries');
    }
  },
};
