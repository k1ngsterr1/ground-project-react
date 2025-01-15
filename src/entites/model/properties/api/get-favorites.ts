"use client";

import { apiClient } from "@/shared/config/apiClient";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";

interface FavoriteItem {
    id: number;
    userId: number;
    propertyId: number;
    property: IGetPropertiesRDO;
}



export const getFavorites = async (userId: string): Promise<FavoriteItem[]> => {
    try {
        const { data } = await apiClient.get<FavoriteItem[]>(`/favorites/${userId}`);
        return data;
    } catch (error) {
        console.error("Failed to fetch favorites:", error);
        throw error;
    }
};
