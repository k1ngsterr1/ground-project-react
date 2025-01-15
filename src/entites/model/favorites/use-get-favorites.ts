import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "./get-favorites";
import { IGetPropertiesRDO } from "../properties/rdo/get-properties.rdo";

interface FavoriteItem {
  id: number;
  userId: number;
  propertyId: number;
  property: IGetPropertiesRDO;
}

export const useGetFavorites = (userId: string) => {
  return useQuery<FavoriteItem[], Error>({
    queryKey: ["favorites", userId],
    queryFn: () => getFavorites(userId),
    enabled: !!userId,
  });
};
