"use client";

import { apiClient } from "@/shared/config/apiClient";
import { IGetComparisonRDO } from "../rdo/get-comparisons.rdo";

export const getComparisons = async (
  userId: string
): Promise<IGetComparisonRDO[]> => {
  try {
    const { data } = await apiClient.get<IGetComparisonRDO[]>(
      `/comparisons/${userId}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch comparisons:", error);
    throw error;
  }
};
