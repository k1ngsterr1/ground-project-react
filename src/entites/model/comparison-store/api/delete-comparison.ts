import { apiClient } from "@/shared/config/apiClient";

interface Comparisons {
    comparisonId: number | null;
    propertyId: number;
}

export const deleteComparison = async ({ comparisonId, propertyId }: Comparisons) => {
    const response = await apiClient.delete(`/comparisons/${comparisonId}/property/${propertyId}`);
    return response.data;
};