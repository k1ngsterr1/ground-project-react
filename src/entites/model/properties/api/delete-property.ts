"use client";

import { apiClient } from "@/shared/config/apiClient";

export const deleteProperty = async (propertyID: number): Promise<any> => {
  try {
    const { data } = await apiClient.delete<any>(`properties/${propertyID}`);

    return data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    throw error;
  }
};
