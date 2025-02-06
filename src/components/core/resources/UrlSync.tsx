'use client';

import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useResourcesStore } from '@/store/useResourcesStore';
import { ResourceService } from '@/models/server/resources';

export function UrlSyncResources() {
  const searchParams = useSearchParams();
  const {
    setCategory,
    setSearchQuery,
    setSortBy,
    selectedCategory,
    searchQuery,
    sortBy,
  } = useResourcesStore();

  // Memoized fetch for category ID from slug
  const getCategoryIdBySlug = useCallback(async (slug: string) => {
    try {
      const category = await ResourceService.getCategoryBySlug(slug);
      return category.$id;
    } catch (error) {
      console.error('Category slug lookup failed:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    let isActive = true;
    const params = {
      categorySlug: searchParams.get('category'),
      search: searchParams.get('search'),
      sort: searchParams.get('sort'),
    };

    const syncState = async () => {
      if (params.search !== searchQuery) {
        setSearchQuery(params.search || '');
      }

      if (
        params.sort !== sortBy &&
        (params.sort === 'newest' || params.sort === 'popular')
      ) {
        setSortBy(params.sort);
      }

      if (params.categorySlug) {
        const categoryId = await getCategoryIdBySlug(params.categorySlug);
        if (isActive && categoryId && categoryId !== selectedCategory) {
          setCategory(categoryId);
        }
      } else if (selectedCategory !== null) {
        setCategory(null);
      }
    };

    syncState();

    return () => {
      isActive = false; // Prevent state updates after unmount
    };
  }, [
    searchParams,
    selectedCategory,
    searchQuery,
    sortBy,
    getCategoryIdBySlug,
  ]);

  return null;
}
