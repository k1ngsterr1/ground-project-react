import { apiClient } from "@/shared/config/apiClient";

interface Favorite {
    userId: string;
    propertyId: string;
}

export const deleteFavorite = async ({ userId, propertyId }: Favorite) => {
    await apiClient.delete(`/favorites/${userId}/${propertyId}`);
};