import { ID, Query, type Models } from 'appwrite';
import { databases } from '@/models/client/config';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

export const knowledgeApi = {
  async fetchKnowledgeEntries(params: {
    categoryId?: string;
    searchQuery?: string;
    page?: number;
  }) {
    const limit = 9;
    const page = params.page || 0;
    const offset = page * limit;

    // Build queries using your new field names.
    const queries = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('$createdAt'),
    ];

    // Use the attribute name exactly as defined in your knowledge collection
    if (params.categoryId) {
      queries.push(Query.equal('knowledgeId', params.categoryId));
    }

    if (params.searchQuery) {
      queries.push(Query.search('title', params.searchQuery));
    }

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!,
      queries
    );

    return {
      documents: response.documents.map(mapDocumentToKnowledgeEntry),
      total: response.total,
      hasMore: response.total > offset + limit,
      nextPage: page + 1,
    };
  },
};

function mapDocumentToKnowledgeEntry(doc: Models.Document): KnowledgeEntry {
  return {
    $id: doc.$id,
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    content: doc.content,
    // Now we take the value from the attribute 'knowledgeId'
    categoryId: doc.knowledgeId ?? '',
    featured: doc.featured,
    imageUrl: doc.imageUrl,
    $createdAt: doc.$createdAt,
    $updatedAt: doc.$updatedAt,
    $permissions: doc.$permissions,
  };
}
