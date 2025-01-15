import { useQuery } from "@tanstack/react-query";
import { getComparisons } from "./get-comparisons";

export const useGetComparisons = (userId: string) => {
    return useQuery({
        queryKey: ["comparisons", userId],
        queryFn: () => getComparisons(userId),
        enabled: !!userId,
    });
};