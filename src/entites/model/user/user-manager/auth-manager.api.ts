import { apiClient } from "@/shared/config/apiClient";
import { RegisterDto } from "../user-auth/user-auth.dto";
import axios from "axios";
import reactQueryClient from "@/shared/api/query-client";

export const registerManagerUser = async (data: RegisterDto) => {
  try {
    const response = await apiClient.post("/auth/register-manager", data);
    console.log("Registration successful:", response.data);

    // Revalidate the users query by invalidating it
    await reactQueryClient.invalidateQueries({ queryKey: ["usersData"] });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration failed with status:", error.response.status);
    } else {
      console.error("Registration error:", error);
    }
    throw error;
  }
};
