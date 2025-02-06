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
      const response = await databases.listDocuments(
        db,
        resourceCategoriesCollection,
        [
          Query.equal('mainCategoryId', mainCategoryId),
          Query.equal('isActive', true),
          Query.orderAsc('order'),
        ]
      );
      return response.documents as unknown as ResourceCategory[];
    } catch (error) {
      throw new ResourceError(500, 'Failed to fetch subcategories');
    }
  },

  /**
   * Fetch all resource categories.
   */
  async getResourceCategories(): Promise<ResourceCategory[]> {
    try {
      // Debug environment variables
      console.log('Environment Variables:', {
        db: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        resourceCategoriesCollection: process.env.NEXT_PUBLIC_APPWRITE_RESOURCES_CATEGORIES_COLLECTION_ID,
        actualDb: db,
        actualCollection: resourceCategoriesCollection
      });
      
      if (!db || !resourceCategoriesCollection) {
        throw new Error('Missing required environment variables for resources categories');
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
          ])
        ]
      );
      
      console.log('Response from Appwrite:', response);
      console.log('Documents:', response.documents);
      
      return response.documents as unknown as ResourceCategory[];
    } catch (error) {
      console.error('Error details:', error);
      throw new ResourceError(500, 'Failed to fetch resources categories');
    }
  },

  /**
   * Get a main category by its slug
   */
  async getMainCategoryBySlug(slug: string): Promise<ResourceCategory> {
    try {
      const response = await databases.listDocuments(
        db,
        mainCategoriesCollection,
        [Query.equal('slug', slug)]
      );
      
      if (response.documents.length === 0) {
        throw new ResourceError(404, `Main category not found: ${slug}`);
      }
      
      return response.documents[0] as unknown as ResourceCategory;
    } catch (error) {
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
      const queries: any[] = [
        Query.limit(pageSize),
        Query.offset((page - 1) * pageSize),
        Query.orderDesc('$createdAt'),
      ];

      // If we have a main category slug, get its subcategories
      if (categoryId) {
        try {
          // Get the main category
          const mainCategory = await this.getMainCategoryBySlug(categoryId);
          
          // Get all subcategories for this main category
          const subcategories = await this.getSubcategories(mainCategory.$id);
          
          // Add subcategory filter
          if (subcategories.length > 0) {
            queries.push(Query.equal('resourcesCategoryIds', subcategories.map(cat => cat.$id)));
          }
        } catch (error) {
          console.error('Error getting subcategories:', error);
          // If category not found, return empty results
          return {
            documents: [],
            total: 0,
            hasMore: false,
            nextPage: page + 1,
          };
        }
      }

      if (searchQuery) {
        queries.push(Query.search('title', searchQuery));
      }

      const response = await databases.listDocuments(
        db,
        resourcesCollection,
        queries
      );

      // Helper to get the first category from the resourceCategoryIds array.
      const getFirstCategoryId = (doc: any): string =>
        Array.isArray(doc.resourceCategoryIds) &&
        doc.resourceCategoryIds.length > 0
          ? doc.resourceCategoryIds[0]
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
      return {
        documents: enrichedEntries,
        total: response.total,
        hasMore: response.total > page * pageSize,
        nextPage: page + 1,
      };
    } catch (error) {
      console.error('ResourceService.listResourceEntries failed:', error);
      throw new ResourceError(
        (error as any)?.code || 500,
        (error as any)?.message || 'Failed to fetch resource entries'
      );
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
        Array.isArray(doc.resourceCategoryIds) &&
        doc.resourceCategoryIds.length > 0
          ? doc.resourceCategoryIds[0]
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
        Array.isArray(doc.resourceCategoryIds) &&
        doc.resourceCategoryIds.length > 0
          ? doc.resourceCategoryIds[0]
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
      const response = await databases.listDocuments(
        db,
        resourceCategoriesCollection,
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
        throw new ResourceError(404, 'Category not found');
      }
      return response.documents[0] as unknown as ResourceCategory;
    } catch (error) {
      throw new ResourceError(500, 'Failed to fetch category');
    }
  },
};
