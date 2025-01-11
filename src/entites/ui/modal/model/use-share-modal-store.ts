import { create } from "zustand";

interface ShareModalStore {
  isOpen: boolean;
  url: string;
  openModal: () => void;
  closeModal: () => void;
}

export const useShareModalStore = create<ShareModalStore>((set) => ({
  isOpen: false,
  url: "",
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
