export interface ResourceEntry {
  $id: string;
  title: string;
  slug: string;
  // Allowed types for resources – note these differ from Knowledge
  type: 'app' | 'book' | 'course' | 'podcast' | 'software' | 'youtube' | string;
  summary: string;
  // For Resources, “content” might be additional details or a long description
  content: string;
  featured: boolean;
  imageUrl: string;
  // We assume Resources are linked to categories similar to Knowledge,
  // but they’re stored in a different collection.
  categoryId: string;
  categorySlug: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}
