import { create } from "zustand";
import { logout } from "./user-auth.api";

interface AuthState {
  isAuthorized: boolean;
  isLoading: boolean;
  type: "user";
  setType: (type: "user") => void;
  setAuthorized: (isAuthorized: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthorized: false,
  type: "user",
  isLoading: true,
  setType: (type) => {
    set({ type });
  },
  setAuthorized: (isAuthorized) => set({ isAuthorized, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    set({ isLoading: true });
    try {
      if (get().type === "user") await logout();

      set({ isAuthorized: false });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
