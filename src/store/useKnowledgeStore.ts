import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, StateStorage } from 'zustand/middleware';
import { Query } from 'appwrite';

type KnowledgeState = {
  selectedCategory: string | null;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  sortBy: 'newest' | 'popular';
};

type KnowledgeActions = {
  setCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sort: 'newest' | 'popular') => void;
  buildQuery: () => Query[];
};

const urlStorage: StateStorage = {
  getItem: (key) => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  },
  setItem: (key, value) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  },
  removeItem: (key) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(key);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  },
};

export const useKnowledgeStore = create<KnowledgeState & KnowledgeActions>()(
  immer(
    persist(
      (set, get) => ({
        selectedCategory: null,
        searchQuery: '',
        viewMode: 'grid',
        sortBy: 'newest',

        setCategory: (categoryId) => set({ selectedCategory: categoryId }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setViewMode: (mode) => set({ viewMode: mode }),
        setSortBy: (sort) => set({ sortBy: sort }),

        buildQuery: () => {
          const { selectedCategory, searchQuery, sortBy } = get();
          const queries = [];

          if (selectedCategory) {
            queries.push(Query.equal('categoryId', selectedCategory));
          }

          if (searchQuery) {
            queries.push(Query.search('title', searchQuery));
          }

          queries.push(
            sortBy === 'newest'
              ? Query.orderDesc('$createdAt')
              : Query.orderDesc('views')
          );

          return queries;
        },
      }),
      {
        name: 'knowledge-store',
        storage: urlStorage,
        partialize: (state) => ({
          selectedCategory: state.selectedCategory,
          searchQuery: state.searchQuery,
          sortBy: state.sortBy,
        }),
      }
    )
  )
);
