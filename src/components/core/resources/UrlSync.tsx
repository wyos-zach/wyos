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
      // Only update if params differ from current state
      if (params.search !== searchQuery) {
        setSearchQuery(params.search || '');
      }

      if (
        params.sort !== sortBy &&
        (params.sort === 'latest' || params.sort === 'popular')
      ) {
        setSortBy(params.sort);
      }

      // Handle category slug to ID conversion
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
      isActive = false;
    };
  }, [
    searchParams,
    setCategory,
    setSearchQuery,
    setSortBy,
    selectedCategory,
    searchQuery,
    sortBy,
    getCategoryIdBySlug,
  ]);

  return null;
}
