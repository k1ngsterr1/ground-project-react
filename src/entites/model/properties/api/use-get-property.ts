import { useQuery } from "@tanstack/react-query";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";
import { getProperty } from "./get-property";

export const useGetProperty = (propertyID: number) => {
  return useQuery<IGetPropertiesRDO, Error>({
    queryKey: ["propertiesData", propertyID],
    queryFn: () => getProperty(propertyID),
    staleTime: 5 * 60 * 1000,
  });
};
