import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  isMobileMenuOpen: boolean;
}

interface UIActions {
  toggleTheme: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    immer((set) => ({
      // Initial state
      theme: 'dark',
      isMobileMenuOpen: false,

      // Actions
      toggleTheme() {
        set((state) => {
          state.theme = state.theme === 'dark' ? 'light' : 'dark';
        });
      },
      openMobileMenu() {
        set((state) => {
          state.isMobileMenuOpen = true;
        });
      },
      closeMobileMenu() {
        set((state) => {
          state.isMobileMenuOpen = false;
        });
      },
    })),
    {
      name: 'ui-store', // Key for localStorage
    }
  )
);
