"use client";

import { apiClient } from "@/shared/config/apiClient";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";

export const getProperties = async (): Promise<IGetPropertiesRDO[]> => {
  try {
    const { data } = await apiClient.get<IGetPropertiesRDO[]>("properties");

    return data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    throw error;
  }
};