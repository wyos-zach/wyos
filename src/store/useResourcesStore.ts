import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ResourcesState {
  selectedCategory: string | null;
  isFetching: boolean;
  searchQuery: string;
  sortBy: string;
}

interface ResourcesActions {
  setCategory: (categoryId: string | null) => void;
  setIsFetching: (isFetching: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
}

export const useResourcesStore = create<ResourcesState & ResourcesActions>()(
  immer((set) => ({
    selectedCategory: null,
    isFetching: false,
    searchQuery: '',
    sortBy: 'latest',
    setCategory: (categoryId) => set({ selectedCategory: categoryId }),
    setIsFetching: (isFetching) => set({ isFetching }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSortBy: (sort) => set({ sortBy: sort }),
  }))
);
