import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProperty } from "./add-property"; // Import your add function
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";
import { AddPropertyDTO } from "../dto/add-property.dto";

export const useAddProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<IGetPropertiesRDO, Error, AddPropertyDTO>({
    mutationFn: addProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["propertiesData"],
      });
    },
  });
};
