import { useQuery } from "@tanstack/react-query";
import { IGetUsersRDO } from "./rdo/get-users.rdo";
import { getUsers } from "./get-users";

export const useGetUsers = () => {
  return useQuery<IGetUsersRDO[], Error>({
    queryKey: ["usersData"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
  });
};
