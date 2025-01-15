import { create } from "zustand";
import { logout } from "./user-auth.api";

interface AuthState {
  isAuthorized: boolean;
  isLoading: boolean;
  type: "admin" | "manager" | "user"; // Define available roles
  setType: (type: "admin" | "manager" | "user") => void;
  setAuthorized: (isAuthorized: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  loadToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthorized: false,
  type: "user", // Default role
  isLoading: true,

  // Fetch user data and update the store
  loadToken: async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // Include cookies for session management
      });

      if (!response.ok) {
        throw new Error("Not authorized");
      }

      const user = await response.json();
      set({ isAuthorized: true, type: user.role, isLoading: false }); // Set role and authorization status
      return true;
    } catch (error: any) {
      console.error("Authorization failed:", error.message);
      set({ isAuthorized: false, isLoading: false });
      return false;
    }
  },

  setType: (type) => {
    set({ type });
  },

  setAuthorized: (isAuthorized) => set({ isAuthorized, isLoading: false }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: async () => {
    set({ isLoading: true });
    try {
      await logout(); // Call your logout API or logic
      set({ isAuthorized: false, type: "user" }); // Reset role and authorization
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
