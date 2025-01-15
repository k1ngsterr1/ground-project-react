import { apiClient } from "@/shared/config/apiClient";

export const checkExpertToken = async (): Promise<boolean> => {
  try {
    const { data } = await apiClient.get<{ isValid: boolean }>(
      `/admin/auth/check-token`
    );
    return data.isValid;
  } catch (error) {
    console.log("Token check failed:", error);
    return false;
  }
};
