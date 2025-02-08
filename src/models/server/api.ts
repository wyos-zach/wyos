import { Client, Account, Databases, type Models, Query } from 'appwrite';
import env from '@/lib/config/env';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import { knowledgeCategoriesCollection } from '@/models/name';

if (!env.appwrite.projectId) {
  throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined');
}

if (!env.appwrite.endpoint) {
  throw new Error('NEXT_PUBLIC_APPWRITE_ENDPOINT is not defined');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID) {
  throw new Error('NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID is not defined');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID) {
  throw new Error('NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID is not defined');
}

export const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

export const knowledgeApi = {
  async fetchKnowledgeEntries(params: {
    categoryId?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
  }) {
    const { categoryId, page = 1, limit = 9, sortBy = 'latest' } = params;

    const queries = [];

    if (categoryId) {
      queries.push(Query.equal('knowledgeCategoryIds', categoryId));
    }

    if (sortBy === 'latest') {
      queries.push(Query.orderDesc('$createdAt'));
    } else if (sortBy === 'popular') {
      queries.push(Query.orderDesc('views'));
    }

    queries.push(Query.limit(limit));
    queries.push(Query.offset((page - 1) * limit));
    queries.push(Query.select([
      '$id',
      'title',
      'slug',
      'summary',
      'content',
      'knowledgeCategoryIds',
      'featured',
      'imageUrl',
    ]));

    const response = await databases.listDocuments<Models.Document & KnowledgeEntry>(
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID || '',
      queries
    );

    // Add category slug mapping logic
    const entries = await Promise.all(
      response.documents.map(async (doc) => {
        const categorySlug = await this.getCategorySlug(
          doc.knowledgeCategoryIds
        );
        return {
          ...doc,
          categorySlug,
        };
      })
    );

    return {
      entries,
      total: response.total,
    };
  },

  async getCategorySlug(categoryId: string): Promise<string> {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID || '',
      knowledgeCategoriesCollection,
      [Query.equal('$id', categoryId), Query.select(['slug'])]
    );
    return response.documents[0]?.slug || 'uncategorized';
  },
};
