import { ID, Query, type Models } from 'appwrite';
import { account, databases } from './config';
import type { KnowledgeEntry } from '@/types/knowledge';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isActive: boolean;
}

//Category API
function mapDocumentToCategory(doc: Models.Document): Category {
  return {
    id: doc.$id,
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    order: doc.order,
    isActive: doc.isActive,
  };
}

export const categoryApi = {
  fetchCategories: async () => {
    const queries = [Query.orderAsc('order'), Query.equal('isActive', true)];

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
      queries
    );

    return response.documents.map(mapDocumentToCategory);
  },
};

//Knowledge Entry API
function mapDocumentToKnowledgeEntry(doc: Models.Document): KnowledgeEntry {
  return {
    id: doc.$id,
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    content: doc.content,
    categoryId: doc.category?.$id,
    metadata: {
      featured: doc.featured || false,
      publishedAt: new Date(doc.$createdAt),
      updatedAt: new Date(doc.$updatedAt),
      imageUrl: doc.imageUrl,
    },
  };
}

export const knowledgeApi = {
  fetchKnowledgeEntries: async ({
    categoryId,
    searchQuery,
    page = 0,
  }: {
    categoryId?: string;
    searchQuery?: string;
    page: number;
  }) => {
    const limit = 9;
    const offset = page * limit;

    const queries = [Query.limit(limit), Query.offset(offset)];

    if (categoryId) {
      queries.push(Query.equal('categoryId', categoryId));
    }

    if (searchQuery) {
      queries.push(Query.search('title', searchQuery));
    }

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!,
      queries
    );

    return {
      entries: response.documents.map(mapDocumentToKnowledgeEntry),
      hasMore: response.total > offset + limit,
      nextPage: page + 1,
    };
  },
};

//Auth API
export const authApi = {
  getCurrentUser: () => account.get(),
  login: (email: string, password: string) =>
    account.createEmailPasswordSession(email, password),
  signup: (email: string, password: string, name: string) =>
    account.create(ID.unique(), email, password, name),
  logout: () => account.deleteSession('current'),
  createVerification: (url: string) => account.createVerification(url),
  updateVerification: (userId: string, secret: string) =>
    account.updateVerification(userId, secret),
};
