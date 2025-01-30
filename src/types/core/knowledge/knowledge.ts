export interface KnowledgeEntry {
  $id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categoryId: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  seoDescription?: string;
  keywords?: string[];
}

export interface Category {
  $id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  imageUrl?: string;
  icon?: string;
}

export interface QueryResult<T> {
  documents: T[];
  total: number;
  hasMore: boolean;
  nextPage: number;
}
