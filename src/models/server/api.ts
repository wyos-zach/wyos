import { ID, Query, type Models } from 'appwrite';
import { databases } from '@/models/client/config';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import { knowledgeCategoriesCollection } from '@/models/name';

export const knowledgeApi = {
  async fetchKnowledgeEntries(params: {
    categoryId?: string;
    searchQuery?: string;
    page?: number;
  }) {
    const limit = 9;
    const page = params.page || 0;
    const offset = page * limit;

    const queries = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('$createdAt'),
      Query.select([
        '$id',
        'title',
        'slug',
        'summary',
        'content',
        'knowledgeCategoryIds',
        'featured',
        'imageUrl',
      ]), // Explicitly select needed fields
    ];

    if (params.categoryId) {
      queries.push(Query.equal('knowledgeCategoryIds', params.categoryId));
    }

    if (params.searchQuery) {
      queries.push(Query.search('title', params.searchQuery));
    }

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!,
      queries
    );

    // Add category slug mapping logic
    const entries = await Promise.all(
      response.documents.map(async (doc) => {
        const categorySlug = await this.getCategorySlug(
          doc.knowledgeCategoryIds
        );
        return mapDocumentToKnowledgeEntry(doc, categorySlug);
      })
    );

    return {
      documents: entries,
      total: response.total,
      hasMore: response.total > offset + limit,
      nextPage: page + 1,
    };
  },

  async getCategorySlug(categoryId: string): Promise<string> {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID!,
      knowledgeCategoriesCollection, // Make sure this is imported
      [Query.equal('$id', categoryId), Query.select(['slug'])]
    );
    return response.documents[0]?.slug || 'uncategorized';
  },
};

function mapDocumentToKnowledgeEntry(
  doc: Models.Document,
  categorySlug: string
): KnowledgeEntry {
  return {
    $id: doc.$id,
    title: doc.title,
    slug: doc.slug,
    type: doc.type,
    summary: doc.summary,
    content: doc.content,
    categoryId: doc.knowledgeCategoryIds,
    categorySlug,
    featured: doc.featured,
    imageUrl: doc.imageUrl,
    $createdAt: doc.$createdAt,
    $updatedAt: doc.$updatedAt,
    $permissions: doc.$permissions,
  };
}
