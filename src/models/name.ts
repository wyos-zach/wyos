export const db = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const mainCategoriesCollection =
  process.env.NEXT_PUBLIC_APPWRITE_MAIN_CATEGORIES_COLLECTION_ID!;
export const knowledgeCategoriesCollection =
  process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_CATEGORIES_COLLECTION_ID!;
export const resourceCategoriesCollection =
  process.env.NEXT_PUBLIC_APPWRITE_RESOURCE_CATEGORIES_COLLECTION_ID!;
export const knowledgeCollection =
  process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!;
export const resourcesCollection =
  process.env.NEXT_PUBLIC_APPWRITE_RESOURCES_COLLECTION_ID!;
export const tagsCollection =
  process.env.NEXT_PUBLIC_APPWRITE_TAGS_COLLECTION_ID!;

export const knowledgeAttachmentsBucket = 'knowledge-attachments';
export const resourcesAttachmentsBucket = 'resources-attachments';
export const categoryImagesBucket = 'category-images';
export const categoryIconsBucket = 'category-icons';
