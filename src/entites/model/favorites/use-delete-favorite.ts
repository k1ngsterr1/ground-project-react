import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite } from "./delete-favorite";

export const useDeleteFavorite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFavorite,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ["favorites", variables.userId] 
            });
        },
        onError: (error) => {
            console.error("Error deleting favorite:", error);
        },
    });
};