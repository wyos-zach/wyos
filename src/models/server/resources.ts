import { Query } from 'appwrite';
import { databases } from '@/models/client/config';
import {
  resourcesCollection,
  resourceCategoriesCollection,
} from '@/models/name';
import type { ResourceEntry } from '@/types/core/resources/entry';
import type { PaginatedResult } from '@/types/core/resources/query';
import type { ResourceCategory } from '@/types/core/resources/category';

export type { ResourceCategory };

async function getCategorySlugById(categoryId: string): Promise<string> {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      resourceCategoriesCollection,
      [Query.equal('$id', categoryId), Query.select(['slug']), Query.limit(1)]
    );
    if (response.documents.length > 0) {
      const doc = response.documents[0];
      return doc.slug || 'uncategorized';
    }
    return 'uncategorized';
  } catch (error) {
    console.error('getCategorySlugById error:', error);
    return 'uncategorized';
  }
}

export const ResourceService = {
  async listResourceEntries({
    categoryId,
    searchQuery,
    page = 1,
    pageSize = 9,
  }: {
    categoryId?: string;
    searchQuery?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<ResourceEntry>> {
    try {
      const queries = [];
      if (categoryId) {
        queries.push(Query.equal('resourceCategoryIds', categoryId));
      }
      if (searchQuery) {
        queries.push(Query.search('title', searchQuery));
      }
      queries.push(Query.orderDesc('$createdAt'));
      queries.push(Query.limit(pageSize));
      queries.push(Query.offset((page - 1) * pageSize));
      queries.push(
        Query.select([
          '$id',
          'title',
          'slug',
          'type',
          'summary',
          'content',
          'featured',
          'imageUrl',
          'resourceCategoryIds',
          '$createdAt',
          '$updatedAt',
          '$permissions',
        ])
      );
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        resourcesCollection,
        queries
      );
      const getFirstCategoryId = (doc: any): string =>
        Array.isArray(doc.resourceCategoryIds) &&
        doc.resourceCategoryIds.length > 0
          ? doc.resourceCategoryIds[0]
          : '';
      const categoryIds = [
        ...new Set(
          response.documents.map(getFirstCategoryId).filter((id) => Boolean(id))
        ),
      ];
      let categoryMap: Record<string, string> = {};
      for (const id of categoryIds) {
        categoryMap[id] = await getCategorySlugById(id);
      }
      const enrichedEntries: ResourceEntry[] = response.documents.map((doc) => {
        const catId = getFirstCategoryId(doc);
        return {
          $id: doc.$id,
          title: doc.title,
          slug: doc.slug,
          type: doc.type,
          summary: doc.summary,
          content: doc.content,
          featured: doc.featured,
          imageUrl: doc.imageUrl,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
          categoryId: catId,
          categorySlug: categoryMap[catId] || 'uncategorized',
        };
      });
      return {
        documents: enrichedEntries,
        total: response.total,
        hasMore: response.total > page * pageSize,
        nextPage: page + 1,
      };
    } catch (error) {
      console.error('ResourceService.listResourceEntries error:', error);
      throw new Error('Failed to fetch resource entries');
    }
  },

  async getEntryBySlug(slug: string): Promise<ResourceEntry> {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        resourcesCollection,
        [
          Query.equal('slug', slug),
          Query.limit(1),
          Query.select([
            '$id',
            'title',
            'slug',
            'type',
            'summary',
            'content',
            'featured',
            'imageUrl',
            'resourceCategoryIds',
            '$createdAt',
            '$updatedAt',
            '$permissions',
          ]),
        ]
      );
      if (response.documents.length === 0) {
        throw new Error('Resource entry not found');
      }
      const doc = response.documents[0];
      const getFirstCategoryId = (doc: any): string =>
        Array.isArray(doc.resourceCategoryIds) &&
        doc.resourceCategoryIds.length > 0
          ? doc.resourceCategoryIds[0]
          : '';
      const catId = getFirstCategoryId(doc);
      let categorySlug = 'uncategorized';
      if (catId) {
        categorySlug = await getCategorySlugById(catId);
      }
      return {
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        type: doc.type,
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
      console.error('ResourceService.getEntryBySlug error:', error);
      throw new Error('Failed to fetch resource entry');
    }
  },

  async listFeaturedEntries(limit: number = 3): Promise<ResourceEntry[]> {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        resourcesCollection,
        [
          Query.equal('featured', true),
          Query.orderDesc('$createdAt'),
          Query.limit(limit),
        ]
      );
      const getFirstCategoryId = (doc: any): string =>
        Array.isArray(doc.resourceCategoryIds) &&
        doc.resourceCategoryIds.length > 0
          ? doc.resourceCategoryIds[0]
          : '';
      const categoryIds = [
        ...new Set(
          response.documents.map(getFirstCategoryId).filter((id) => Boolean(id))
        ),
      ];
      let categoryMap: Record<string, string> = {};
      for (const id of categoryIds) {
        categoryMap[id] = await getCategorySlugById(id);
      }
      const enrichedEntries: ResourceEntry[] = response.documents.map((doc) => {
        const catId = getFirstCategoryId(doc);
        return {
          $id: doc.$id,
          title: doc.title,
          slug: doc.slug,
          type: doc.type,
          summary: doc.summary,
          content: doc.content,
          featured: doc.featured,
          imageUrl: doc.imageUrl,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
          categoryId: catId,
          categorySlug: categoryMap[catId] || 'uncategorized',
        };
      });
      return enrichedEntries;
    } catch (error) {
      console.error('ResourceService.listFeaturedEntries error:', error);
      throw new Error('Failed to fetch featured resource entries');
    }
  },

  async getResourceCategories(): Promise<ResourceCategory[]> {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        resourceCategoriesCollection,
        [Query.orderAsc('name'), Query.limit(100)]
      );
      return response.documents.map((doc): ResourceCategory => ({
        $id: doc.$id,
        name: doc.name,
        slug: doc.slug,
        description: doc.description,
        isActive: doc.isActive ?? true,
        imageUrl: doc.imageUrl,
        icon: doc.icon,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
      }));
    } catch (error) {
      console.error('getResourceCategories error:', error);
      throw error;
    }
  },

  async getCategoryBySlug(slug: string): Promise<ResourceCategory> {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        resourceCategoriesCollection,
        [Query.equal('slug', slug), Query.limit(1)]
      );
      if (response.documents.length === 0) {
        throw new Error(`Category with slug ${slug} not found`);
      }
      const doc = response.documents[0];
      return {
        $id: doc.$id,
        name: doc.name,
        slug: doc.slug,
        description: doc.description,
        isActive: doc.isActive ?? true,
        imageUrl: doc.imageUrl,
        icon: doc.icon,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
      };
    } catch (error) {
      console.error('getCategoryBySlug error:', error);
      throw error;
    }
  },
};
