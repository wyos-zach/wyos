import { databases } from '@/models/client/config';
import { db, resourcesCollection, resourceCategoriesCollection, mainCategoriesCollection } from '@/models/name';
import { Query, type Models, AppwriteException } from 'appwrite';
import type { ResourceEntry } from '@/types/core/resources/entry';
import type { ResourceCategory } from '@/types/core/resources/category';
import type { PaginatedResult } from '@/types/core/shared/pagination';

type ResourceDocument = Models.Document & ResourceEntry;
type ResourceCategoryDocument = Models.Document & ResourceCategory;

class ResourceError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(message);
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
      const catDoc = catResponse.documents[0] as ResourceCategoryDocument;
      return catDoc.slug;
    }
    return 'uncategorized';
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error('Appwrite error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return 'uncategorized';
  }
}

export const ResourceService = {
  async getMainCategories(): Promise<ResourceCategory[]> {
    try {
      const response = await databases.listDocuments<ResourceCategoryDocument>(
        db,
        mainCategoriesCollection,
        [Query.equal('isActive', true), Query.orderAsc('order')]
      );
      return response.documents;
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      return [];
    }
  },

  /**
   * NEW: Fetch subcategories (i.e. resource categories that belong to a given main category).
   * Uses the "mainCategoryId" field in the resource-categories collection.
   */
  async getSubcategories(mainCategoryId: string): Promise<ResourceCategory[]> {
    try {
      const response = await databases.listDocuments<ResourceCategoryDocument>(
        db,
        resourceCategoriesCollection,
        [
          Query.equal('mainCategoryId', mainCategoryId),
          Query.equal('isActive', true),
          Query.orderAsc('order'),
        ]
      );

      return response.documents;
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new ResourceError(500, 'Failed to fetch subcategories');
    }
  },

  /**
   * Fetch all resource categories.
   */
  async getResourceCategories(): Promise<ResourceCategory[]> {
    try {
      if (!db || !resourceCategoriesCollection) {
        throw new Error(
          'Missing required environment variables for resources categories'
        );
      }

      const response = await databases.listDocuments<ResourceCategoryDocument>(
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

      return response.documents;
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new ResourceError(500, 'Failed to fetch resource categories');
    }
  },

  /**
   * Get a main category by its slug
   */
  async getMainCategoryBySlug(slug: string): Promise<ResourceCategory> {
    try {
      const response = await databases.listDocuments<ResourceCategoryDocument>(
        db,
        mainCategoriesCollection,
        [Query.equal('slug', slug)]
      );

      if (response.documents.length === 0) {
        throw new ResourceError(404, `Main category not found: ${slug}`);
      }

      return response.documents[0];
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new ResourceError(500, `Failed to fetch main category: ${slug}`);
    }
  },

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

      const response = await databases.listDocuments<ResourceDocument>(
        db,
        resourcesCollection,
        queries
      );

      return {
        documents: response.documents,
        total: response.total,
        hasMore: response.total > page * pageSize,
        nextPage: page + 1,
      };
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      return {
        documents: [],
        total: 0,
        hasMore: false,
        nextPage: 1,
      };
    }
  },

  async getEntryBySlug(slug: string): Promise<ResourceEntry | null> {
    try {
      const response = await databases.listDocuments<ResourceDocument>(db, resourcesCollection, [
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
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new ResourceError(500, 'Failed to fetch resource entry');
    }
  },

  async listFeaturedEntries(limit = 3): Promise<ResourceEntry[]> {
    try {
      const response = await databases.listDocuments<ResourceDocument>(db, resourcesCollection, [
        Query.equal('featured', true),
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
      ]);
      const getFirstCategoryId = (doc: ResourceDocument): string =>
        Array.isArray(doc.resourcesCategoryIds) && doc.resourcesCategoryIds.length > 0
          ? doc.resourcesCategoryIds[0]
          : '';

      const categoryIds = [
        ...new Set(
          response.documents
            .map(getFirstCategoryId)
            .filter((id): id is string => Boolean(id))
        ),
      ];

      const categoryMap: Record<string, string> = {};
      for (const id of categoryIds) {
        categoryMap[id] = await getCategorySlugById(id);
      }

      const enrichedEntries = await Promise.all(
        response.documents.map(async (doc) => {
          const catId = getFirstCategoryId(doc);
          return {
            ...doc,
            categoryId: catId,
            categorySlug: categoryMap[catId] || 'uncategorized',
          };
        })
      );
      return enrichedEntries;
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
        throw new ResourceError(error.code, error.message);
      } else {
        console.error('Unknown error:', error);
        throw new ResourceError(500, 'Failed to fetch featured entries');
      }
    }
  },

  /**
   * (Optional) Fetch a specific category by its slug.
   */
  async getCategoryBySlug(slug: string): Promise<ResourceCategory | null> {
    try {
      const response = await databases.listDocuments<ResourceCategoryDocument>(db, resourceCategoriesCollection, [
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
      ]);

      if (response.documents.length === 0) {
        return null;
      }
      return response.documents[0];
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new ResourceError(500, 'Failed to fetch resource category');
    }
  },

  async getResourceEntry(slug: string): Promise<ResourceEntry | null> {
    try {
      const response = await databases.listDocuments<ResourceDocument>(db, resourcesCollection, [
        Query.equal('slug', slug),
      ]);
      if (response.documents.length === 0) {
        return null;
      }
      return response.documents[0];
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error('Appwrite error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      return null;
    }
  },
};
