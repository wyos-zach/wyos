'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';

export function UrlSync() {
  const searchParams = useSearchParams();
  const { setCategory, setSearchQuery, setSortBy, selectedCategory } =
    useKnowledgeStore();

  // Fetch category by slug
  useEffect(() => {
    const categorySlug = searchParams.get('category');
    if (!categorySlug) return;

    KnowledgeService.getCategoryBySlug(categorySlug).then((category) => {
      if (category) {
        setCategory(category.$id);
      }
    });
  }, [searchParams, setCategory]);

  // Update URL when store changes
  useEffect(() => {
    if (!selectedCategory) return;

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('category', selectedCategory);
    window.history.replaceState({}, '', newUrl.toString());
  }, [selectedCategory]);

  useEffect(() => {
    let isActive = true;
    const params = {
      categorySlug: searchParams.get('category'),
      query: searchParams.get('q'),
      sort: searchParams.get('sort'),
    };

    if (isActive) {
      if (params.query) setSearchQuery(params.query);
      if (params.sort) setSortBy(params.sort);
    }

    return () => {
      isActive = false;
    };
  }, [searchParams, setSearchQuery, setSortBy]);

  return null;
}
