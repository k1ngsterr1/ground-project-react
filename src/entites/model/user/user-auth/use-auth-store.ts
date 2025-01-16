import { create } from "zustand";
import { logout } from "./user-auth.api";
import { apiClient } from "@/shared/config/apiClient";

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

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  type: "user", // Default role
  isLoading: true,

  // Fetch user data and update the store
  loadToken: async () => {
    set({ isLoading: true }); // Explicitly set loading to true
    try {
      const response = await apiClient.get("/users/info/me");
      const user = await response;

      set({
        isAuthorized: true,
        type: user.data.role,
        isLoading: false, // Finalize loading
      });
      return true;
    } catch (error: any) {
      console.error("Authorization failed:", error);
      set({ isAuthorized: false, isLoading: false }); // Ensure loading is finalized
      return false;
    }
  },

  setType: (type) => {
    set({ type });
  },

  setAuthorized: (isAuthorized) => set({ isAuthorized, isLoading: false }), // Reset loading when setting authorization

  setLoading: (isLoading) => set({ isLoading }), // Simple setter for loading state

  logout: async () => {
    set({ isLoading: true }); // Set loading state during logout
    try {
      await logout(); // Call your logout API
      set({ isAuthorized: false, type: "user" }); // Reset role and authorization
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    } finally {
      set({ isLoading: false }); // Ensure loading state is finalized
    }
  },
}));
