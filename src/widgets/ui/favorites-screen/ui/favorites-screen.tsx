import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { useGetFavorites } from "@/entites/model/properties/api/use-get-favorites";
import { useGetMe } from "@/entites/model/user/user-auth/use-get-me";
import { PropertyCard } from "@/entites/ui/property-card/ui/property-card";
import { SkeletonPropertyCard } from "@/entites/ui/skeleton-property-card/ui/skeleton-property-card";

export const FavoritesScreen = () => {
  const { data: meData } = useGetMe();
  const id = meData?.id.toString();
  const { data: favoritesData, isLoading } = useGetFavorites(id || "");

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Избранное", href: "/favorites", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 sm:px-6 py-4 sm:py-6 mt-[60px] sm:mt-16">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 ">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#2f2f2f]">
            Избранное
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonPropertyCard key={index} />
            ))
            : favoritesData?.map((favorite) => {
              const property = favorite.property;
              if (!property || !property.image || !property.image.length) return null;

              return (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  image={property.image[0]}
                  name={property.name}
                  description={property.description}
                  price={property.price}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
