import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";
import { LoginDto, RegisterDto } from "./user-auth.dto";

export const login = async (data: LoginDto) => {
  try {
    const response = await apiClient.post("/auth/login", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login failed with status:", error.response.status);
    } else {
      console.error("Login error:", error);
    }
    throw error;
  }
};

export const registerUser = async (data: RegisterDto) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    console.log("Registration successful:", response.data);
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

export const logout = async () => {
  try {
    const response = await apiClient.get("/auth/logout");

    return response.data;
  } catch (error) {
    throw error;
  }
};
