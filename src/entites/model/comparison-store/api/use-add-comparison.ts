
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComparison } from "./post-comparison";

export const useAddComparison = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addComparison,
        onSuccess: (newComparison) => {
            queryClient.invalidateQueries({ queryKey: ["comparisonsData"] });
            queryClient.setQueryData(["comparisonsData"], (oldData: string) => {
                return oldData ? [...oldData, newComparison] : [newComparison];
            });
        },
        onError: (error) => {
            console.error("Failed to add comparison:", error);
        },
    });
};