import { ID, Query } from 'appwrite';
import { databases } from '@/models/client/config';
import {
  db,
  mainCategoriesCollection,
  knowledgeCategoriesCollection,
  knowledgeCollection,
} from '@/models/name';
import type {
  KnowledgeEntry,
  KnowledgeCategory,
  PaginatedResult,
} from '@/types/core/knowledge';

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
  }): Promise<PaginatedResult<KnowledgeEntry & { categorySlug: string }>> {
    try {
      const queries = [];

      // Filter by category using the 'knowledgeCategoryIds' attribute.
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

      // Extract unique category IDs from the fetched entries.
      const categoryIds = [
        ...new Set(
          response.documents
            .map((doc) => doc.knowledgeCategoryIds)
            .filter((id): id is string => Boolean(id))
        ),
      ];

      // Look up the corresponding category documents.
      let categoryMap: Record<string, KnowledgeCategory> = {};
      if (categoryIds.length) {
        const catResponse = await databases.listDocuments(
          db,
          knowledgeCategoriesCollection,
          [
            // Use Query.equal with an array value as per Appwrite's Query syntax.
            Query.equal('$id', categoryIds),
            Query.select(['$id', 'slug']),
          ]
        );
        categoryMap = catResponse.documents.reduce(
          (acc, doc) => {
            acc[doc.$id] = doc as unknown as KnowledgeCategory;
            return acc;
          },
          {} as Record<string, KnowledgeCategory>
        );
      }

      // Enrich each knowledge entry with its corresponding categorySlug.
      const enrichedEntries = response.documents.map((doc) => ({
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        content: doc.content,
        categoryId: doc.knowledgeCategoryIds ?? '',
        featured: doc.featured,
        imageUrl: doc.imageUrl,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions,
        categorySlug:
          categoryMap[doc.knowledgeCategoryIds]?.slug || 'uncategorized',
      }));

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

  async getSubcategories(mainCategoryId: string): Promise<KnowledgeCategory[]> {
    try {
      const response = await databases.listDocuments(
        db,
        knowledgeCategoriesCollection,
        [
          Query.equal('mainCategoryId', mainCategoryId),
          Query.equal('isActive', true),
          Query.orderAsc('order'),
          Query.select([
            '$id',
            'name',
            'slug',
            'description',
            'order',
            'imageUrl',
            'icon',
            '$createdAt',
            '$updatedAt',
          ]),
        ]
      );

      return response.documents.map((doc) => ({
        $id: doc.$id,
        name: doc.name,
        slug: doc.slug,
        description: doc.description,
        order: doc.order,
        isActive: doc.isActive,
        icon: doc.icon,
        imageUrl: doc.imageUrl,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
      }));
    } catch (error) {
      console.error('KnowledgeService.getSubcategories failed:', error);
      throw new KnowledgeError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch subcategories'
      );
    }
  },

  async getEntryBySlug(
    slug: string
  ): Promise<KnowledgeEntry & { categorySlug: string }> {
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

      let categorySlug = doc.knowledgeCategoryIds;
      if (categorySlug) {
        const catResponse = await databases.listDocuments(
          db,
          knowledgeCategoriesCollection,
          [
            Query.equal('$id', [doc.knowledgeCategoryIds]),
            Query.select(['slug']),
            Query.limit(1),
          ]
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
        categoryId: doc.knowledgeCategoryIds ?? '',
        categorySlug: categorySlug || 'uncategorized',
        featured: doc.featured,
        imageUrl: doc.imageUrl,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions,
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

      // Extract unique category IDs.
      const categoryIds = [
        ...new Set(
          response.documents
            .map((doc) => doc.knowledgeCategoryIds)
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

      const enrichedEntries = response.documents.map((doc) => ({
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        content: doc.content,
        categoryId: doc.knowledgeCategoryIds ?? '',
        categorySlug:
          categoryMap[doc.knowledgeCategoryIds]?.slug ??
          doc.knowledgeCategoryIds,
        featured: doc.featured,
        imageUrl: doc.imageUrl,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions,
      }));

      return enrichedEntries as KnowledgeEntry[];
    } catch (error) {
      throw new KnowledgeError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch featured entries'
      );
    }
  },
};
