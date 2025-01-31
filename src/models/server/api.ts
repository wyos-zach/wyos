// models/server/api.ts
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

    const queries = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('$createdAt'),
    ];

    if (params.categoryId) {
      queries.push(Query.equal('categoryId', params.categoryId));
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
    categoryId: doc.categoryId,
    featured: doc.featured,
    $createdAt: doc.$createdAt,
    $updatedAt: doc.$updatedAt,
    imageUrl: doc.imageUrl,
    seoDescription: doc.seoDescription,
    keywords: doc.keywords,
    $permissions: doc.$permissions,
  };
}
