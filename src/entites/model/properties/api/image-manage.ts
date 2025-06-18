import { apiClient } from "@/shared/config/apiClient";

export const addImageToProperty = async (id: number, imageUrl: string) => {
  const { data } = await apiClient.patch(`/properties/${id}/add-image`, {
    imageUrl,
  });
  return data;
};

export const removeImageFromProperty = async (id: number, imageUrl: string) => {
  const { data } = await apiClient.patch(`/properties/${id}/remove-image`, {
    imageUrl,
  });
  return data;
};
