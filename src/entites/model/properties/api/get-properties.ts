"use client";

import { apiClient } from "@/shared/config/apiClient";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";

export const getProperties = async (filters?: {
  priceMin?: number;
  priceMax?: number;
  squareMin?: number;
  squareMax?: number;
  location?: string;
  number?: number; // Добавляем number
}): Promise<IGetPropertiesRDO[]> => {
  try {
    const { data } = await apiClient.get<IGetPropertiesRDO[]>("properties", {
      params: filters, // Передаем все фильтры, включая number
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    throw error;
  }
};
