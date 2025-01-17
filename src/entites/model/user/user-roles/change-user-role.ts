import { apiClient } from "@/shared/config/apiClient";

export const changeUserRole = async (
  id: number,
  role: string
): Promise<any> => {
  if (!["user", "manager", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  const response = await apiClient.patch(`/users/role/${id}`, { role });
  return response.data;
};
