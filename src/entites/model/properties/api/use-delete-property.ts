import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "./delete-property";

export const useDeleteProperty = () => {
  const queryClient = useQueryClient(); // Access QueryClient instance

  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["propertiesData"], // Specify the query key
      });
    },
  });
};
