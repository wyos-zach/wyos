import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface KnowledgeState {
  selectedCategory: string | null;
}

interface KnowledgeActions {
  setCategory: (categoryId: string | null) => void;
}

export const useKnowledgeStore = create<KnowledgeState & KnowledgeActions>()(
  immer((set) => ({
    selectedCategory: null,
    setCategory: (categoryId) => set({ selectedCategory: categoryId }),
  }))
);
