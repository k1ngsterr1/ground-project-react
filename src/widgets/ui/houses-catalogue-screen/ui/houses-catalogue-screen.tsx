import { Banknote, MapPin, Square } from "lucide-react";
import { FilterButton } from "@/entites/ui/filter-button/ui/filter-button";
import { PropertyCard } from "@/entites/ui/property-card/ui/property-card";
import img from "@/assets/catalogue_mockup.png";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";

const houses = [
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
  {
    id: 1,
    image: img,
    title: "Скандинавский уют",
    description: "Современный дом в черте города, стильный интерьер и сад.",
    price: 15200000,
  },
];

export const HousesCatalogueScreen = () => {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог домов", href: "/houses-catalogue", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 sm:px-6 py-4 sm:py-6 mt-[60px] sm:mt-16">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#2f2f2f]">
            Каталог домов
          </h1>
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap items-center gap-2 sm:gap-4">
              <FilterButton
                icon={<Banknote className="w-4 h-4" />}
                label="Цена"
              />
              <FilterButton
                icon={<MapPin className="w-4 h-4" />}
                label="Локация"
              />
              <FilterButton
                icon={<Square className="w-4 h-4" />}
                label="Площадь"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {houses.map((house) => (
            <PropertyCard key={house.id} {...house} />
          ))}
        </div>
      </div>
    </div>
  );
};
