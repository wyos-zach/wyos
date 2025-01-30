'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';

export function UrlSync() {
  const searchParams = useSearchParams();
  const { setCategory, setSearchQuery, setSortBy } = useKnowledgeStore();

  useEffect(() => {
    const params = {
      category: searchParams.get('category'),
      search: searchParams.get('search'),
      sort: searchParams.get('sort'),
    };

    if (params.category) setCategory(params.category);
    if (params.search) setSearchQuery(params.search);
    if (params.sort) setSortBy(params.sort as 'newest' | 'popular');
  }, [searchParams]);

  return null;
}
