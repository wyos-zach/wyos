import type { Query } from 'appwrite';
import type { PaginatedResult } from '@/types/core/knowledge';

export interface IRepository<T> {
  create(entity: Omit<T, '$id' | '$createdAt' | '$updatedAt'>): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T>;
  findAll(
    filters?: Record<string, any>,
    options?: {
      queries?: Query[];
      page?: number;
      pageSize?: number;
    }
  ): Promise<PaginatedResult<T>>;
  findBySlug(slug: string): Promise<T>;
}
