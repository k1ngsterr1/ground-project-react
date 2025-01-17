import { useQuery } from "@tanstack/react-query";
import { getProperties } from "./get-properties";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";

export const useGetProperties = (filters?: {
  priceMin?: number;
  priceMax?: number;
  squareMin?: number;
  squareMax?: number;
  location?: string;
}) => {
  return useQuery<IGetPropertiesRDO[], Error>({
    queryKey: ["propertiesData", filters], // Include filters in the queryKey
    queryFn: () => getProperties(filters), // Pass filters to the query function
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
