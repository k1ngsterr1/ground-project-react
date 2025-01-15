import { apiClient } from "@/shared/config/apiClient";

interface Comparisons {
    comparisonId: number;
    propertyId: number;
}

export const addComparison = async ({ comparisonId, propertyId }: Comparisons) => {
    const response = await apiClient.post(`/comparisons/${comparisonId}/property/${propertyId}`);
    return response.data;
};
