"use client";

import { apiClient } from "@/shared/config/apiClient";

export const getLocations = async (): Promise<string[]> => {
  try {
    const { data } = await apiClient.get<string[]>(`properties/get/locations`);

    return data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    throw error;
  }
};
