import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "./add-favorite";

export const useAddFavorite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addFavorite,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ["favorites", variables.userId] 
            });
        },
        onError: (error) => {
            console.error("Failed to add favorite:", error);
        },
    });
};