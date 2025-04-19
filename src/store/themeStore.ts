import { create } from 'zustand';

type ThemeStore = {
  currentTheme: 'growth' | 'action';
  setTheme: (theme: 'growth' | 'action') => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: 'growth',
  setTheme: (theme) => set({ currentTheme: theme }),
}));
