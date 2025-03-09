'use client';

import { useContentStore } from '@/store/useContentStore';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import type { ResourceCategory } from '@/types/core/resources/category';
import type { ResourceEntry } from '@/types/core/resources/entry';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type ContentType = 'knowledge' | 'resources';
type CategoryType = KnowledgeCategory | ResourceCategory;
type EntryType = KnowledgeEntry | ResourceEntry;

type UrlSyncConfig = {
  service: {
    getCategoryBySlug: (slug: string) => Promise<CategoryType | null>;
    getEntryBySlug: (slug: string) => Promise<EntryType | null>;
  };
  storeKey: ContentType;
  entryParam?: string; // e.g., 'entry' or 'resource' for entry slug
};

export function UrlSync({
  service,
  storeKey,
  entryParam = 'entry',
}: UrlSyncConfig) {
  const searchParams = useSearchParams();
  const { setCategory, setEntry, setSearchQuery, setSortBy } = useContentStore(
    (state) => ({
      setCategory: (categoryId: string | null) =>
        state.setCategory(storeKey, categoryId),
      setEntry: (entryId: string | null) => state.setEntry(storeKey, entryId),
      setSearchQuery: (query: string) => state.setSearchQuery(storeKey, query),
      setSortBy: (sort: string) => state.setSortBy(storeKey, sort),
    })
  );

  // Memoized category fetch
  const getCategoryIdBySlug = useCallback(
    async (slug: string) => {
      try {
        const category = await service.getCategoryBySlug(slug);
        return category?.$id ?? null;
      } catch (error) {
        console.error(`Error fetching ${storeKey} category:`, error);
        return null;
      }
    },
    [service, storeKey]
  );

  // Memoized entry fetch
  const getEntryIdBySlug = useCallback(
    async (slug: string) => {
      try {
        const entry = await service.getEntryBySlug(slug);
        return entry?.$id ?? null;
      } catch (error) {
        console.error(`Error fetching ${storeKey} entry:`, error);
        return null;
      }
    },
    [service, storeKey]
  );

  // Sync URL params to store on mount/update
  useEffect(() => {
    let isActive = true;

    const params = {
      categorySlug: searchParams.get('category'),
      entrySlug: searchParams.get(entryParam),
      query: searchParams.get('q'),
      sort: searchParams.get('sort'),
    };

    if (isActive) {
      // Set search query immediately
      setSearchQuery(params.query || '');

      // Fetch and set category if slug exists
      if (params.categorySlug) {
        getCategoryIdBySlug(params.categorySlug).then((categoryId) => {
          if (isActive && categoryId) setCategory(categoryId);
        });
      } else {
        setCategory(null);
      }

      // Fetch and set entry if slug exists
      if (params.entrySlug) {
        getEntryIdBySlug(params.entrySlug).then((entryId) => {
          if (isActive && entryId) setEntry(entryId);
        });
      } else {
        setEntry(null);
      }

      // Set sort if provided
      if (params.sort && setSortBy) {
        setSortBy(params.sort);
      }
    }

    return () => {
      isActive = false;
    };
  }, [
    searchParams,
    getCategoryIdBySlug,
    getEntryIdBySlug,
    setCategory,
    setEntry,
    setSearchQuery,
    setSortBy,
    entryParam,
  ]);

  // Sync store changes back to URL
  useEffect(() => {
    const currentCategory = searchParams.get('category');
    const currentEntry = searchParams.get(entryParam);
    const { selectedCategory, selectedEntry } =
      useContentStore.getState()[storeKey];

    const newUrl = new URL(window.location.href);

    if (currentCategory !== selectedCategory && selectedCategory) {
      newUrl.searchParams.set('category', selectedCategory);
    } else if (!selectedCategory) {
      newUrl.searchParams.delete('category');
    }

    if (currentEntry !== selectedEntry && selectedEntry) {
      newUrl.searchParams.set(entryParam, selectedEntry);
    } else if (!selectedEntry) {
      newUrl.searchParams.delete(entryParam);
    }

    if (
      currentCategory !== selectedCategory ||
      currentEntry !== selectedEntry
    ) {
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams, storeKey, entryParam]);

  return null;
}
