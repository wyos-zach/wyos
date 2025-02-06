import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ResourcesState {
  selectedCategory: string | null;
}

interface ResourcesActions {
  setCategory: (categoryId: string | null) => void;
}

export const useResourcesStore = create<ResourcesState & ResourcesActions>()(
  immer((set) => ({
    selectedCategory: null,
    setCategory: (categoryId) => set({ selectedCategory: categoryId }),
  }))
);
