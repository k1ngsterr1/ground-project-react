import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import FilterDropdown from "./FilterDropdown";
import { fetchProperties } from "@/api/properties";
import { Banknote, MapPin, Square } from "lucide-react";

const PropertySearch = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    location: null,
    squareMin: null,
    squareMax: null,
  });

  const {
    data: properties,
    isLoading,
    refetch,
  } = useQuery(
    ["properties", searchNumber, filters],
    () =>
      fetchProperties({
        number: searchNumber,
        ...filters,
      }),
    {
      enabled:
        !!searchNumber || Object.values(filters).some((val) => val !== null),
    }
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNumber(e.target.value);
  };

  const handleSearch = () => {
    refetch();
  };

  const handleFilterChange = (type: string, value: string | number | null) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    refetch();
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by number"
          value={searchNumber}
          onChange={handleSearchChange}
        />
        <Button variant="outline" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className="flex flex-nowrap items-center gap-2 sm:gap-4">
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
          onSelect={(value: string) => {
            let priceMin: number | undefined = undefined;
            let priceMax: number | undefined = undefined;

            switch (value) {
              case "До 7 млн":
                priceMin = 0;
                priceMax = 7000000;
                break;
              case "7-10 млн":
                priceMin = 7000000;
                priceMax = 10000000;
                break;
              case "10-15 млн":
                priceMin = 10000000;
                priceMax = 15000000;
                break;
              case "15-20 млн":
                priceMin = 15000000;
                priceMax = 20000000;
                break;
              case "20 и более":
                priceMin = 20000000;
                priceMax = undefined;
                break;
            }

            handleFilterChange("priceMin", priceMin as any);
            handleFilterChange("priceMax", priceMax as any);
          }}
        />
        <FilterDropdown
          icon={<MapPin className="w-4 h-4" />}
          label="Локация"
          options={["Location1", "Location2"]}
          onSelect={(value: any) => handleFilterChange("location", value)}
        />
        <FilterDropdown
          icon={<Square className="w-4 h-4" />}
          label="Площадь"
          options={["До 50 м²", "50-100 м²", "100-200 м²", "Более 200 м²"]}
          onSelect={(value: any) =>
            handleFilterChange(
              "squareMin",
              value === "До 50 м²" ? 0 : value === "50-100 м²" ? 50 : null
            )
          }
        />
        <Button
          variant="outline"
          onClick={() =>
            setFilters({
              priceMin: null,
              priceMax: null,
              location: null,
              squareMin: null,
              squareMax: null,
            })
          }
        >
          Сбросить фильтры
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {properties && (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>{property.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertySearch;
