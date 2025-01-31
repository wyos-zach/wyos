import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware';
import { Query } from 'appwrite';

interface KnowledgeState {
  isFetching: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  sortBy: 'newest' | 'popular';
}

interface KnowledgeActions {
  setFetching: (state: boolean) => void;
  setCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sort: 'newest' | 'popular') => void;
  buildQuery: () => string[];
}

type State = KnowledgeState & KnowledgeActions;

const urlStorage: PersistStorage<State> = {
  getItem: (name: string): StorageValue<State> | null => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get(name);
    if (!value) return null;

    // Convert URL params to state shape
    const params = new URLSearchParams(value);
    const state = {
      selectedCategory: params.get('selectedCategory'),
      searchQuery: params.get('searchQuery') || '',
      sortBy: (params.get('sortBy') as 'newest' | 'popular') || 'newest',
      viewMode: (params.get('viewMode') as 'grid' | 'list') || 'grid',
      isFetching: false,
      setFetching: () => {},
      setCategory: () => {},
      setSearchQuery: () => {},
      setViewMode: () => {},
      setSortBy: () => {},
      buildQuery: () => [],
    } as State;

    return {
      state,
      version: 0
    };
  },
  setItem: (name: string, value: StorageValue<State>): void => {
    const searchParams = new URLSearchParams(window.location.search);
    const state = value.state;
    const urlParams = new URLSearchParams();
    if (state.selectedCategory)
      urlParams.set('selectedCategory', state.selectedCategory);
    if (state.searchQuery) urlParams.set('searchQuery', state.searchQuery);
    if (state.sortBy) urlParams.set('sortBy', state.sortBy);
    if (state.viewMode) urlParams.set('viewMode', state.viewMode);
    searchParams.set(name, urlParams.toString());
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  },
  removeItem: (name: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(name);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  },
};

export const useKnowledgeStore = create<
  State,
  [
    ['zustand/immer', never],
    ['zustand/persist', State],
  ]
>(
  immer(
    persist(
      (set, get) => ({
        isFetching: false,
        selectedCategory: null,
        searchQuery: '',
        viewMode: 'grid',
        sortBy: 'newest',
        setFetching: (state) => set({ isFetching: state }),
        setCategory: (categoryId) => set({ selectedCategory: categoryId }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setViewMode: (mode) => set({ viewMode: mode }),
        setSortBy: (sort) => set({ sortBy: sort }),
        buildQuery: () => {
          const { selectedCategory, searchQuery, sortBy } = get();
          return [
            ...(selectedCategory
              ? [Query.equal('categoryId', selectedCategory)]
              : []),
            ...(searchQuery ? [Query.search('title', searchQuery)] : []),
            sortBy === 'newest'
              ? Query.orderDesc('$createdAt')
              : Query.orderDesc('views'),
          ];
        },
      }),
      {
        name: 'knowledge-store',
        storage: urlStorage,
        partialize: (state) => ({
          ...state,
          // Only override specific fields if needed
          isFetching: false, // Reset fetching state on rehydration
        }),
      }
    )
  )
);
