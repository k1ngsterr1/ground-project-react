import { useState } from "react";
import { useComparisonStore } from "@/entites/model/comparison-store/use-comparison-store";
import { PropertyCard } from "@/entites/ui/property-card/ui/property-card";
import { SkeletonPropertyCard } from "@/entites/ui/skeleton-property-card/ui/skeleton-property-card";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { Button } from "@/shared/ui/button/button";
import { Banknote, MapPin, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useGetProperties } from "@/entites/model/properties/api/use-get-properties";
import { FilterDropdown } from "@/entites/ui/filter-dropdown/ui/filter-dropdown";
import { useGetLocations } from "@/entites/model/properties/api/use-get-locations";
import { debounce } from "lodash";

export const HousesCatalogueScreen = () => {
  const navigate = useNavigate();
  const { selectedIds } = useComparisonStore();

  // Filters state
  const [filters, setFilters] = useState<{
    priceMin?: number;
    priceMax?: number;
    squareMin?: number;
    squareMax?: number;
    location?: string;
    number?: number;
  }>({});

  const [searchNumber, setSearchNumber] = useState(""); // Добавляем состояние для номера
  const { data: properties, isLoading } = useGetProperties(filters);
  const { data: locations } = useGetLocations();

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог домов", href: "/houses-catalogue", isActive: true },
  ];

  const handleSearchInput = debounce((value: string) => {
    setFilters((prev) => ({
      ...prev,
      number: value ? Number(value) : undefined,
    }));
  }, 500);

  // Обработка ввода пользователя
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchNumber(value);
    handleSearchInput(value); // Запуск debounced обновления
  };

  // Filtered properties by type (house)
  const filteredProperties = properties?.filter(
    (property) => property.type === "house"
  );

  const initialFilters = {
    priceMin: undefined,
    priceMax: undefined,
    squareMin: undefined,
    squareMax: undefined,
    location: undefined,
  };

  // Update filters
  const handlePriceSelect = (option: string) => {
    switch (option) {
      case "До 7 млн":
        setFilters((prev) => ({ ...prev, priceMin: 0, priceMax: 7000000 }));
        break;
      case "7-10 млн":
        setFilters((prev) => ({
          ...prev,
          priceMin: 7000000,
          priceMax: 10000000,
        }));
        break;
      case "10-15 млн":
        setFilters((prev) => ({
          ...prev,
          priceMin: 10000000,
          priceMax: 15000000,
        }));
        break;
      case "15-20 млн":
        setFilters((prev) => ({
          ...prev,
          priceMin: 15000000,
          priceMax: 20000000,
        }));
        break;
      case "20 и более":
        setFilters((prev) => ({
          ...prev,
          priceMin: 20000000,
          priceMax: undefined, // Нет верхней границы
        }));
        break;
    }
  };

  const handleLocationSelect = (option: string) => {
    setFilters((prev) => ({ ...prev, location: option }));
  };

  const handleAreaSelect = (option: string) => {
    switch (option) {
      case "До 50 м²":
        setFilters((prev) => ({ ...prev, squareMin: 0, squareMax: 50 }));
        break;
      case "50-100 м²":
        setFilters((prev) => ({ ...prev, squareMin: 50, squareMax: 100 }));
        break;
      case "100-200 м²":
        setFilters((prev) => ({ ...prev, squareMin: 100, squareMax: 200 }));
        break;
      case "Более 200 м²":
        setFilters((prev) => ({
          ...prev,
          squareMin: 200,
          squareMax: undefined,
        }));
        break;
    }
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 sm:px-6 py-4 sm:py-6 mt-[60px] sm:mt-16">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 ">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#2f2f2f]">
            Каталог домов
          </h1>
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="Введите номер"
                  className="border rounded-full border-green text-green placeholder:text-green p-2 pl-3 "
                  value={searchNumber || ""}
                  onChange={handleInputChange}
                />
              </div>
              <FilterDropdown
                icon={<Banknote className="w-4 h-4" />}
                label="Цена"
                options={[
                  "До 7 млн",
                  "7-10 млн",
                  "10-15 млн",
                  "15-20 млн",
                  "20 и более",
                ]}
                onSelect={handlePriceSelect}
              />
              {locations && (
                <FilterDropdown
                  icon={<MapPin className="w-4 h-4" />}
                  label="Локация"
                  options={locations}
                  onSelect={handleLocationSelect}
                />
              )}
              <FilterDropdown
                icon={<Square className="w-4 h-4" />}
                label="Площадь"
                options={[
                  "До 50 м²",
                  "50-100 м²",
                  "100-200 м²",
                  "Более 200 м²",
                ]}
                onSelect={handleAreaSelect}
              />
              <Button variant="outline" onClick={handleResetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonPropertyCard key={index} />
              ))
            : filteredProperties?.map((house) => (
                <PropertyCard
                  isGround={false}
                  key={house.id}
                  id={house.id}
                  image={house.image[0]}
                  name={house.name}
                  description={house.description}
                  price={house.price}
                />
              ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-8">
        {selectedIds.length > 1 && (
          <Button onClick={() => navigate("/comparison")}>
            Перейти к сравнению
          </Button>
        )}
      </div>
    </div>
  );
};
