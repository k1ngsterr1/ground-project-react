"use client";

import { apiClient } from "@/shared/config/apiClient";

interface ComparisonItem {
    id?: number;
    userId: number;
}

export const getComparisons = async (userId: string, id?: number): Promise<ComparisonItem[]> => {
    try {
        const { data } = await apiClient.get<ComparisonItem[]>(`/comparisons/${userId}`);
        return data;
    } catch (error) {
        console.error("Failed to fetch comparisons:", error);
        throw error;
    }
};
