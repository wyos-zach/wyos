import { ID, Query, type Models } from 'appwrite';
import { databases } from '@/models/client/config';
import type { IRepository } from './types';
import { DataAccessError } from './errors';

export abstract class AppwriteBaseRepository<T> implements IRepository<T> {
  constructor(
    protected readonly databaseId: string,
    protected readonly collectionId: string
  ) {}

  protected abstract mapDocument(document: Models.Document): T;

  async create(
    entity: Omit<T, '$id' | '$createdAt' | '$updatedAt'>
  ): Promise<T> {
    try {
      const response = await databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        entity
      );
      return this.mapDocument(response);
    } catch (error) {
      throw new DataAccessError(
        (error as any)?.code || 500,
        `Failed to create document: ${(error as any)?.message}`
      );
    }
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    try {
      const response = await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        id,
        entity
      );
      return this.mapDocument(response);
    } catch (error) {
      throw new DataAccessError(
        (error as any)?.code || 500,
        `Failed to update document ${id}: ${(error as any)?.message}`
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await databases.deleteDocument(this.databaseId, this.collectionId, id);
    } catch (error) {
      throw new DataAccessError(
        (error as any)?.code || 500,
        `Failed to delete document ${id}: ${(error as any)?.message}`
      );
    }
  }

  async findById(id: string): Promise<T> {
    try {
      const response = await databases.getDocument(
        this.databaseId,
        this.collectionId,
        id
      );
      return this.mapDocument(response);
    } catch (error) {
      throw new DataAccessError(
        (error as any)?.code || 500,
        `Document ${id} not found: ${(error as any)?.message}`
      );
    }
  }

  async findAll(
    filters: Record<string, any> = {},
    options: {
      queries?: Query[];
      page?: number;
      pageSize?: number;
    } = {}
  ): Promise<PaginatedResult<T>> {
    try {
      const pageSize = options.pageSize || 9;
      const page = options.page || 1;
      const offset = (page - 1) * pageSize;

      const queries = [
        Query.limit(pageSize),
        Query.offset(offset),
        ...(options.queries || []),
      ];

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queries.push(Query.equal(key, value));
      });

      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );

      return {
        documents: response.documents.map(this.mapDocument),
        total: response.total,
        hasMore: response.total > offset + pageSize,
        nextPage: page + 1,
      };
    } catch (error) {
      throw new DataAccessError(
        (error as any)?.code || 500,
        `Failed to list documents: ${(error as any)?.message}`
      );
    }
  }

  async findBySlug(slug: string): Promise<T> {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('slug', slug), Query.limit(1)]
      );

      if (response.documents.length === 0) {
        throw new DataAccessError(404, `Document with slug ${slug} not found`);
      }

      return this.mapDocument(response.documents[0]);
    } catch (error) {
      throw new DataAccessError(
        (error as any)?.code || 500,
        `Failed to find document by slug ${slug}: ${(error as any)?.message}`
      );
    }
  }
}
import page from '@/app/(marketing)/page';
import { PaginatedResult } from '@/types/core/knowledge';
import { equal } from 'assert';
import { create } from 'domain';
import { unique } from 'next/dist/build/utils';
import { map } from 'zod';
