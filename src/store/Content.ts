import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ContentState {
  selectedCategory: string | null;
  isFetching: boolean;
  searchQuery: string;
  sortBy: string;
}

interface ContentActions {
  setCategory: (categoryId: string | null) => void;
  setIsFetching: (isFetching: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  reset: () => void; // Optional: reset to initial state
}

const initialState: ContentState = {
  selectedCategory: null,
  isFetching: false,
  searchQuery: '',
  sortBy: 'latest',
};

export const useContentStore = create<ContentState & ContentActions>()(
  immer((set) => ({
    ...initialState,
    setCategory: (categoryId) => set({ selectedCategory: categoryId }),
    setIsFetching: (isFetching) => set({ isFetching }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSortBy: (sort) => set({ sortBy: sort }),
    reset: () => set(initialState),
  }))
);
