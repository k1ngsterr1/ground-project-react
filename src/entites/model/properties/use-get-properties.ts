import { useQuery } from "@tanstack/react-query";
import { getProperties } from "./get-properties";
import { IGetPropertiesRDO } from "./rdo/get-properties.rdo";

export const useGetProperties = () => {
  return useQuery<IGetPropertiesRDO[], Error>({
    queryKey: ["propertiesData"],
    queryFn: getProperties,
    staleTime: 5 * 60 * 1000,
  });
};
