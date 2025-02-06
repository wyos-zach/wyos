export interface PaginatedResult<T> {
  documents: T[];
  total: number;
  hasMore: boolean;
  nextPage: number;
}
