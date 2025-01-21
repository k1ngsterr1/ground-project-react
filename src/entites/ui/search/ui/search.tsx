import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import FilterDropdown from "./FilterDropdown";
import { fetchProperties } from "@/api/properties";

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
          options={["До 1 млн", "1-5 млн", "5-10 млн", "Более 10 млн"]}
          onSelect={(value) =>
            handleFilterChange(
              "priceMin",
              value === "До 1 млн" ? 0 : value === "1-5 млн" ? 1000000 : null
            )
          }
        />
        <FilterDropdown
          icon={<MapPin className="w-4 h-4" />}
          label="Локация"
          options={["Location1", "Location2"]}
          onSelect={(value) => handleFilterChange("location", value)}
        />
        <FilterDropdown
          icon={<Square className="w-4 h-4" />}
          label="Площадь"
          options={["До 50 м²", "50-100 м²", "100-200 м²", "Более 200 м²"]}
          onSelect={(value) =>
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
