import { useGetComparisons } from "@/entites/model/comparison-store/api/use-get-comparisons";
import { useGetMe } from "@/entites/model/user/user-auth/use-get-me";
import { BrokerTab } from "@/features/ui/broker-tab/ui/broker-tab";
import { ObjectDescription } from "@/features/ui/object-description/ui/object-description";
import { Gallery } from "@/features/ui/object-gallery/ui/object-gallery";
import { ObjectInfo } from "@/features/ui/object-info/ui/object-info";
import { PriceTab } from "@/features/ui/price-tab/ui/price-tab";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { Button } from "@/shared/ui/button/button";
import { SkeletonPropertyCard } from "@/entites/ui/skeleton-property-card/ui/skeleton-property-card";

export const ComparisonScreen = () => {
  const { data: userData } = useGetMe();
  const { data: comparisonsData, isLoading } = useGetComparisons(
    userData?.id?.toString() || ""
  );

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог домов", href: "/houses-catalogue" },
    { label: "Сравнение объектов", href: "/comparison", isActive: true },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16 max-w-[1390px] mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-[32px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#2f2f2f] text-left lg:text-left">
          Сравнение объектов
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-8">
          <SkeletonPropertyCard />
          <SkeletonPropertyCard />
        </div>
      </div>
    );
  }

  if (!comparisonsData || comparisonsData.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16 max-w-[1390px] mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-[32px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#2f2f2f] text-left lg:text-left">
          Сравнение объектов
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16 max-w-[1390px] mx-auto">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-[32px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#2f2f2f] text-left lg:text-left">
        Сравнение объектов
      </h1>
      {comparisonsData.map((comparison, comparisonIndex) =>
        comparison.properties.map((propertyData, index) => {
          const { property } = propertyData;
          return (
            <div key={`${comparisonIndex}-${index}`}>
              {index > 0 && (
                <div className="w-full h-[1px] bg-green mt-8 mb-8"></div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8 mt-8">
                <div className="space-y-6">
                  <Gallery images={property.image} />
                </div>
                <div className="space-y-6">
                  {/* <BrokerTab /> */}
                  <ObjectDescription text={property.description} />
                  <ObjectInfo
                    type={property.type}
                    square={property.square}
                    location={property.location}
                  />
                  <PriceTab price={property.price} number={property.number} />
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Button
                      className="w-full sm:w-[240px] h-[45px]"
                      variant="blue"
                    >
                      Поделиться
                    </Button>
                    <Button
                      className="w-full sm:w-[240px] h-[45px]"
                      variant="transparent_blue"
                    >
                      <div className="flex items-center justify-center gap-2">
                        Добавить в избранное
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
