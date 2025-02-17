import { useQuery } from "@tanstack/react-query";
import { getProperties } from "./get-properties";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";

export const useGetProperties = (filters?: {
  priceMin?: number;
  priceMax?: number;
  squareMin?: number;
  squareMax?: number;
  location?: string;
  number?: number; // Добавляем number в параметры
  name?: string;
}) => {
  return useQuery<IGetPropertiesRDO[], Error>({
    queryKey: ["propertiesData", filters], // Фильтры в queryKey для кеширования
    queryFn: () => getProperties(filters), // Передаем фильтры в запрос
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
