import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ContentType = 'knowledge' | 'resources';

interface ContentSectionState {
  selectedCategory: string | null;
  selectedEntry: string | null;
  isFetching: boolean;
  searchQuery: string;
  sortBy: string;
}

interface ContentState {
  knowledge: ContentSectionState;
  resources: ContentSectionState;
}

interface ContentActions {
  setCategory: (section: ContentType, categoryId: string | null) => void;
  setEntry: (section: ContentType, entryId: string | null) => void;
  setIsFetching: (section: ContentType, isFetching: boolean) => void;
  setSearchQuery: (section: ContentType, query: string) => void;
  setSortBy: (section: ContentType, sort: string) => void;
}

const initialState: ContentState = {
  knowledge: {
    selectedCategory: null,
    selectedEntry: null,
    isFetching: false,
    searchQuery: '',
    sortBy: 'latest',
  },
  resources: {
    selectedCategory: null,
    selectedEntry: null,
    isFetching: false,
    searchQuery: '',
    sortBy: 'latest',
  },
};

export const useContentStore = create<ContentState & ContentActions>()(
  immer((set) => ({
    ...initialState,
    setCategory: (section, categoryId) =>
      set((state) => {
        state[section].selectedCategory = categoryId;
      }),
    setEntry: (section, entryId) =>
      set((state) => {
        state[section].selectedEntry = entryId;
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
