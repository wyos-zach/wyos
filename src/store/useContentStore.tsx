import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ContentState {
  knowledge: {
    selectedCategory: string | null;
    isFetching: boolean;
    searchQuery: string;
    sortBy: string;
  };
  resources: {
    selectedCategory: string | null;
    isFetching: boolean;
    searchQuery: string;
    sortBy: string;
  };
}

interface ContentActions {
  setCategory: (
    section: 'knowledge' | 'resources',
    categoryId: string | null
  ) => void;
  setIsFetching: (
    section: 'knowledge' | 'resources',
    isFetching: boolean
  ) => void;
  setSearchQuery: (section: 'knowledge' | 'resources', query: string) => void;
  setSortBy: (section: 'knowledge' | 'resources', sort: string) => void;
}

export const useContentStore = create<ContentState & ContentActions>()(
  immer((set) => ({
    knowledge: {
      selectedCategory: null,
      isFetching: false,
      searchQuery: '',
      sortBy: 'latest',
    },
    resources: {
      selectedCategory: null,
      isFetching: false,
      searchQuery: '',
      sortBy: 'latest',
    },
    setCategory: (section, categoryId) =>
      set((state) => {
        state[section].selectedCategory = categoryId;
      }),
    setIsFetching: (section, isFetching) =>
      set((state) => {
        state[section].isFetching = isFetching;
      }),
    setSearchQuery: (section, query) =>
      set((state) => {
        state[section].searchQuery = query;
      }),
    setSortBy: (section, sort) =>
      set((state) => {
        state[section].sortBy = sort;
      }),
  }))
);
