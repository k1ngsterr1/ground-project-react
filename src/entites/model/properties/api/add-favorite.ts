import { apiClient } from "@/shared/config/apiClient";

type Favorite = {
    userId: string;
    propertyId: string;
};

export const addFavorite = async ({ userId, propertyId }: Favorite) => {
    await apiClient.post(`/favorites/${userId}/${propertyId}`);
};