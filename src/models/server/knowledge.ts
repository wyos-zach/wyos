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
  }): Promise<PaginatedResult<KnowledgeEntry>> {
    try {
      const queries = [];

      // If your actual field is "knowledgeCategoryId" in Appwrite, filter by that:
      if (categoryId) {
        queries.push(Query.equal('knowledgeCategoryId', categoryId));
      }

      if (searchQuery) {
        queries.push(Query.search('title', searchQuery));
      }

      // Remove "knowledgeCategoryId" from Query.select if Appwrite won't allow selecting that field
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
          'seoDescription',
          'keywords',
          '$createdAt',
          '$updatedAt',
          '$permissions',
        ]),
      ]);

      return {
        documents: response.documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          slug: doc.slug,
          summary: doc.summary,
          content: doc.content,
          // Use it if the doc returns it. Otherwise this might be undefined if the field can't be selected.
          categoryId: doc.knowledgeCategoryId ?? '',
          featured: doc.featured,
          imageUrl: doc.imageUrl,
          seoDescription: doc.seoDescription,
          keywords: doc.keywords,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
        })),
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
          // Must match the exact attribute: if it's "mainCategoryId" in Appwrite, keep the case
          Query.equal('mainCategoryId', mainCategoryId),
          Query.equal('isActive', true),
          Query.orderAsc('order'),
          Query.select([
            '$id',
            'name',
            'slug',
            'description',
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

  async getEntryBySlug(slug: string): Promise<KnowledgeEntry> {
    try {
      // Remove "knowledgeCategoryId" if Appwrite doesn't allow it in Query.select
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
          'seoDescription',
          'keywords',
          '$createdAt',
          '$updatedAt',
          '$permissions',
        ]),
      ]);

      if (response.documents.length === 0) {
        throw new KnowledgeError(404, 'Knowledge entry not found');
      }

      const doc = response.documents[0];
      return {
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        content: doc.content,
        // Use doc.knowledgeCategoryId if Appwrite returns it, or fallback
        categoryId: doc.knowledgeCategoryId ?? '',
        featured: doc.featured,
        imageUrl: doc.imageUrl,
        seoDescription: doc.seoDescription,
        keywords: doc.keywords,
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
      ]);
      if (!response.documents.length) {
        return [];
      }
      return response.documents as unknown as KnowledgeEntry[];
    } catch (error) {
      throw new KnowledgeError(
        (error as any)?.code || 500,
        `Failed to fetch featured entries: ${(error as any)?.message}`
      );
    }
  },
};
