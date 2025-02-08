'use client';

import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useResourcesStore } from '@/store/useResourcesStore';
import { ResourceService } from '@/models/server/resources';

export function UrlSyncResources() {
  const searchParams = useSearchParams();
  const setCategory = useResourcesStore((state) => state.setCategory);
  const setSearchQuery = useResourcesStore((state) => state.setSearchQuery);

  /**
   * Helper function to get a category ID from a slug.
   * Returns null if not found or on error.
   */
  const getCategoryIdBySlug = useCallback(async (slug: string) => {
    try {
      const category = await ResourceService.getCategoryBySlug(slug);
      if (!category) {
        console.error('Category slug lookup failed: category is null');
        return null;
      }
      return category.$id;
    } catch (_error) {
      console.error('Category slug lookup failed:', _error);
      return null;
    }
  }, []);

  useEffect(() => {
    const categorySlug = searchParams.get('category');
    const searchQuery = searchParams.get('q');

    // Set the search query immediately
    setSearchQuery(searchQuery || '');

    // If there's a category slug, look up its ID and set it
    if (categorySlug) {
      getCategoryIdBySlug(categorySlug).then((categoryId) => {
        setCategory(categoryId);
      });
    } else {
      setCategory(null);
    }
  }, [searchParams, getCategoryIdBySlug, setCategory, setSearchQuery]);

  return null;
}
