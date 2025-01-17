import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserRole } from "./change-user-role";

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      changeUserRole(id, role),
    onSuccess: () => {
      // Optionally revalidate the users query
      queryClient.invalidateQueries({ queryKey: ["usersData"] });
      console.log("User role updated successfully!");
    },
    onError: (error: any) => {
      console.error("Error updating user role:", error);
    },
  });
};
