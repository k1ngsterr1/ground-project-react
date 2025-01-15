import { useQuery } from "@tanstack/react-query";
import { getMe } from "./get-me";
import { IGetMeRDO } from "./rdo/get-me.rdo";

export const useGetMe = () => {
  return useQuery<IGetMeRDO, Error>({
    queryKey: ["meData"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });
};
