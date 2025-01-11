import { create } from "zustand";

interface ComparisonStore {
  selectedIds: number[];
  addId: (id: number) => void;
  removeId: (id: number) => void;
  clearIds: () => void;
}

export const useComparisonStore = create<ComparisonStore>((set) => ({
  selectedIds: [],
  addId: (id) => set((state) => ({ selectedIds: [...state.selectedIds, id] })),
  removeId: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id),
    })),
  clearIds: () => set({ selectedIds: [] }),
}));
