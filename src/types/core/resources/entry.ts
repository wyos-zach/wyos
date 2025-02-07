import { ResourceCategory } from './category';

export interface ResourceEntry {
  $id: string;
  title: string;
  slug: string;
  type: 'app' | 'book' | 'course' | 'podcast' | 'software' | 'youtube' | string;
  summary: string;
  content: string;
  featured: boolean;
  imageUrl: string;
  categoryId: string;
  categorySlug: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

export interface ResourceEntryWithRelations extends ResourceEntry {
  category?: ResourceCategory;
  relatedEntries?: ResourceEntry[];
}
