import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProperty } from "./add-property";

export const useAddProperty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });
};