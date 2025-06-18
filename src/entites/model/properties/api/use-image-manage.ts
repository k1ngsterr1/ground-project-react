import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addImageToProperty, removeImageFromProperty } from "./image-manage";

export const useAddImageToProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, imageUrl }: { id: number; imageUrl: string }) =>
      addImageToProperty(id, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertiesData"] });
    },
  });
};

export const useRemoveImageFromProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, imageUrl }: { id: number; imageUrl: string }) =>
      removeImageFromProperty(id, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertiesData"] });
    },
  });
};
