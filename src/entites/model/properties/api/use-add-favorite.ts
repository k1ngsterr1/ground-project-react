
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "./add-favorite";

export const useAddFavorite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addFavorite,
        onSuccess: (newFavorite) => {
            queryClient.invalidateQueries({ queryKey: ["favoritesData"] });
            queryClient.setQueryData(["favoritesData"], (oldData: string) => {
                return oldData ? [...oldData, newFavorite] : [newFavorite];
            });
        },
        onError: (error) => {
            console.error("Failed to add favorite:", error);
        },
    });
};