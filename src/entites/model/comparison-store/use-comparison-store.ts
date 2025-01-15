import { create } from "zustand";
import Cookies from "js-cookie";

const COMPARISON_COOKIE_KEY = "comparison_ids";

const getStoredIds = (): number[] => {
  const storedIds = Cookies.get(COMPARISON_COOKIE_KEY);
  return storedIds ? JSON.parse(storedIds) : [];
};

const setStoredIds = (ids: number[]) => {
  Cookies.set(COMPARISON_COOKIE_KEY, JSON.stringify(ids), { expires: 7 });
};

interface ComparisonStore {
  selectedIds: number[];
  addId: (id: number) => void;
  removeId: (id: number) => void;
  clearIds: () => void;
}

export const useComparisonStore = create<ComparisonStore>((set) => ({
  selectedIds: getStoredIds(),
  addId: (id) => set((state) => {
    const newIds = [...state.selectedIds, id];
    setStoredIds(newIds);
    return { selectedIds: newIds };
  }),
  removeId: (id) => set((state) => {
    const newIds = state.selectedIds.filter((selectedId) => selectedId !== id);
    setStoredIds(newIds);
    return { selectedIds: newIds };
  }),
  clearIds: () => {
    Cookies.remove(COMPARISON_COOKIE_KEY);
    set({ selectedIds: [] });
  },
}));
