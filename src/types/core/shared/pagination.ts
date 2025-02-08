export interface PaginatedResult<T> {
  documents: T[];
  total: number;
  hasMore: boolean;
  nextPage: number;
}

export interface QueryFilters {
  categoryId?: string;
  searchQuery?: string;
  featuredOnly?: boolean;
}
