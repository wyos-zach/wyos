export interface KnowledgeEntry {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categoryId: string;
  metadata: {
    featured: boolean;
    publishedAt: Date;
    updatedAt: Date;
    imageUrl?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  orderIndex: number;
  isActive: boolean;
}

export interface QueryResult {
  entries: KnowledgeEntry[];
  hasMore: boolean;
  nextPage: number;
}

export interface KnowledgeGridProps {
  categoryId?: string;
  searchQuery?: string;
}

export interface KnowledgeCardProps {
  entry: KnowledgeEntry;
}

export interface CategoryNavProps {
  currentCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
}

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}
