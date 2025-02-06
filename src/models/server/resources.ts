import { Query } from 'appwrite';
import { databases } from '@/models/client/config';
import {
  db,
  mainCategoriesCollection,
  resourceCategoriesCollection,
  resourcesCollection,
} from '@/models/name';
import type { ResourceEntry } from '@/types/core/resources/entry';
import type { PaginatedResult } from '@/types/core/resources/query';
import type { ResourceCategory } from '@/types/core/resources/category';

export class ResourceError extends Error {
  constructor(
    public code: number,
    message: string,
    public type: string = 'ResourceError'
  ) {
    super(message);
    this.name = 'ResourceError';
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
      resourceCategoriesCollection,
      [Query.equal('$id', categoryId), Query.select(['slug']), Query.limit(1)]
    );
    if (catResponse.documents.length > 0) {
      const catDoc = catResponse.documents[0] as unknown as ResourceCategory;
      return catDoc.slug;
    }
    return 'uncategorized';
  } catch (error) {
    console.error('getCategorySlugById error:', error);
    return 'uncategorized';
  }
}

export const ResourceService = {
  async getMainCategories(): Promise<ResourceCategory[]> {
    try {
      const response = await databases.listDocuments(
        db,
        mainCategoriesCollection,
        [Query.equal('isActive', true), Query.orderAsc('order')]
      );
      return response.documents as unknown as ResourceCategory[];
    } catch (error) {
      throw new ResourceError(500, 'Failed to fetch main categories');
    }
  },

  /**
   * NEW: Fetch subcategories (i.e. resource categories that belong to a given main category).
   * Uses the "mainCategoryId" field in the resource-categories collection.
   */
  async getSubcategories(mainCategoryId: string): Promise<ResourceCategory[]> {
    try {
      console.log('Getting subcategories for main category:', mainCategoryId);
      const response = await databases.listDocuments(
        db,
        resourceCategoriesCollection,
        [
          Query.equal('mainCategoryId', mainCategoryId),
          Query.equal('isActive', true),
          Query.orderAsc('order'),
        ]
      );

      console.log('Subcategories response:', response);
      return response.documents as unknown as ResourceCategory[];
    } catch (error) {
      console.error('Error getting subcategories:', error);
      throw new ResourceError(500, 'Failed to fetch subcategories');
    }
  },

  /**
   * Fetch all resource categories.
   */
  async getResourceCategories(): Promise<ResourceCategory[]> {
    try {
      console.log('Getting all resource categories');
      // Debug environment variables
      console.log('Environment Variables:', {
        db: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        resourceCategoriesCollection:
          process.env.NEXT_PUBLIC_APPWRITE_RESOURCES_CATEGORIES_COLLECTION_ID,
        actualDb: db,
        actualCollection: resourceCategoriesCollection,
      });

      if (!db || !resourceCategoriesCollection) {
        throw new Error(
          'Missing required environment variables for resources categories'
        );
      }

      console.log('Fetching from DB:', db);
      console.log('Collection:', resourceCategoriesCollection);

      const response = await databases.listDocuments(
        db,
        resourceCategoriesCollection,
        [
          Query.equal('isActive', true),
          Query.orderAsc('order'),
          Query.select([
            '$id',
            'name',
            'slug',
            'order',
            'isActive',
            'description',
            'imageUrl',
            'iconUrl',
            'mainCategoryId',
            'type',
            '$createdAt',
            '$updatedAt',
          ]),
        ]
      );

      console.log('All categories response:', response);
      console.log('Documents:', response.documents);

      return response.documents as unknown as ResourceCategory[];
    } catch (error) {
      console.error('Error getting all categories:', error);
      throw new ResourceError(500, 'Failed to fetch resource categories');
    }
  },

  /**
   * Get a main category by its slug
   */
  async getMainCategoryBySlug(slug: string): Promise<ResourceCategory> {
    try {
      console.log('Getting main category by slug:', slug);
      const response = await databases.listDocuments(
        db,
        mainCategoriesCollection,
        [Query.equal('slug', slug)]
      );

      console.log('Main category response:', response);

      if (response.documents.length === 0) {
        throw new ResourceError(404, `Main category not found: ${slug}`);
      }

      return response.documents[0] as unknown as ResourceCategory;
    } catch (error) {
      console.error('Error getting main category:', error);
      throw new ResourceError(500, `Failed to fetch main category: ${slug}`);
    }
  },

  /**
   * List resource entries, optionally filtered by main category
   */
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
      console.log('Listing resource entries with categoryId:', categoryId);
      
      // First let's see all entries and their category IDs
      const allEntries = await databases.listDocuments(
        db,
        resourcesCollection,
        [
          Query.select(['$id', 'title', 'resourcesCategoryIds']),
          Query.limit(100)
        ]
      );
      console.log('All entries and their resourcesCategoryIds:', 
        allEntries.documents.map(d => ({
          id: d.$id,
          title: d.title,
          resourcesCategoryIds: d.resourcesCategoryIds
        }))
      );
      
      const queries = [];

      if (categoryId) {
        console.log('Adding category filter for:', categoryId);
        queries.push(Query.equal('resourcesCategoryIds', categoryId));
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
          'summary',
          'content',
          'featured',
          'imageUrl',
          'mainCategoryId',
          'resourcesCategoryIds',
          '$createdAt',
          '$updatedAt',
          '$permissions',
        ])
      );

      console.log('Final queries:', queries);
      const response = await databases.listDocuments(
        db,
        resourcesCollection,
        queries
      );
      console.log('Response:', response);

      console.log('Documents:', response.documents);
      console.log('Total:', response.total);
      console.log('Has more:', response.total > page * pageSize);
      console.log('Next page:', page + 1);

      return {
        documents: response.documents as unknown as ResourceEntry[],
        total: response.total,
        hasMore: response.total > page * pageSize,
        nextPage: page + 1,
      };
    } catch (error) {
      console.error('Error listing resource entries:', error);
      throw new ResourceError(500, 'Failed to list resource entries');
    }
  },

  async getEntryBySlug(slug: string): Promise<ResourceEntry> {
    try {
      const response = await databases.listDocuments(db, resourcesCollection, [
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
          'resourcesCategoryIds',
          '$createdAt',
          '$updatedAt',
          '$permissions',
        ]),
      ]);
      if (response.documents.length === 0) {
        throw new ResourceError(404, 'Resource entry not found');
      }
      const doc = response.documents[0];
      const catId =
        Array.isArray(doc.resourcesCategoryIds) &&
        doc.resourcesCategoryIds.length > 0
          ? doc.resourcesCategoryIds[0]
          : '';
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
      console.error('ResourceService.getEntryBySlug failed:', error);
      throw new ResourceError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch resource entry'
      );
    }
  },

  async listFeaturedEntries(limit = 3): Promise<ResourceEntry[]> {
    try {
      const response = await databases.listDocuments(db, resourcesCollection, [
        Query.equal('featured', true),
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
      ]);
      const getFirstCategoryId = (doc: any): string =>
        Array.isArray(doc.resourcesCategoryIds) &&
        doc.resourcesCategoryIds.length > 0
          ? doc.resourcesCategoryIds[0]
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
      console.error('Failed to fetch featured entries:', error);
      throw new ResourceError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch featured entries'
      );
    }
  },

  /**
   * (Optional) Fetch a specific category by its slug.
   */
  async getCategoryBySlug(slug: string): Promise<ResourceCategory> {
    try {
      console.log('Getting category by slug:', slug);
      const response = await databases.listDocuments(
        db,
        resourceCategoriesCollection,
        [
          Query.equal('slug', slug),
          Query.equal('isActive', true),
          Query.limit(1),
          Query.select([
            '$id',
            'name',
            'slug',
            'description',
            'order',
            'isActive',
            'iconUrl',
            'imageUrl',
            'mainCategoryId',
            '$createdAt',
            '$updatedAt',
          ]),
        ]
      );
      console.log('Category response:', response);
      if (response.documents.length === 0) {
        throw new ResourceError(404, 'Category not found');
      }
      return response.documents[0] as unknown as ResourceCategory;
    } catch (error) {
      console.error('Error getting category:', error);
      throw new ResourceError(500, 'Failed to fetch category');
    }
  },
};
