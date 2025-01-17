import { useQuery } from "@tanstack/react-query";
import { getLocations } from "./get-locations";

export const useGetLocations = () => {
  return useQuery<string[], Error>({
    queryKey: ["locationsData"],
    queryFn: () => getLocations(),
    staleTime: 5 * 60 * 1000,
  });
};
