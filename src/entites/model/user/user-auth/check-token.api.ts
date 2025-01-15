import { apiClient } from "@/shared/config/apiClient";

export const checkUserToken = async (): Promise<boolean> => {
  try {
    const { data } = await apiClient.get<{ isValid: boolean }>(
      `/user/auth/check-token`
    );
    return data.isValid;
  } catch (error) {
    console.error("Token check failed:", error);
    return false;
  }
};
