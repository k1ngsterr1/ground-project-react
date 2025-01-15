import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComparison } from "./delete-comparison";

export const useDeleteComparison = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComparison,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comparisonsData"] });
        },
        onError: (error) => {
            console.error("Error deleting comparison:", error);
        },
    });
};
