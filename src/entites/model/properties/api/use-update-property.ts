import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProperty } from "./update-property"; // Import your update function
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";
import { UpdatePropertyDTO } from "./update-property.dto";

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IGetPropertiesRDO,
    Error,
    { id: number; data: UpdatePropertyDTO }
  >({
    mutationFn: ({ id, data }) => updateProperty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["propertiesData"],
      });
    },
  });
};
