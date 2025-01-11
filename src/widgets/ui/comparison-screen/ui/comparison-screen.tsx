import image from "@/assets/catalogue_mockup.png";
import { BrokerTab } from "@/features/ui/broker-tab/ui/broker-tab";
import { ObjectDescription } from "@/features/ui/object-description/ui/object-description";
import { Gallery } from "@/features/ui/object-gallery/ui/object-gallery";
import { ObjectInfo } from "@/features/ui/object-info/ui/object-info";
import { PriceTab } from "@/features/ui/price-tab/ui/price-tab";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { Button } from "@/shared/ui/button/button";

const images = Array(7).fill(image);

export const ComparisonScreen = () => {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог домов", href: "/houses-catalogue" },
    { label: "Сравнение объектов", href: "/comparison", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16 max-w-[1390px] mx-auto">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-[32px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#2f2f2f] text-left lg:text-left">
        Сравнение объектов
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8 mt-8">
        <div className="space-y-6">
          <Gallery images={images} />
        </div>
        <div className="space-y-6">
          {/* Agent Card */}
          <BrokerTab />
          {/* Description */}
          <ObjectDescription />
          {/* Property Info */}
          <ObjectInfo />
          {/* Price and ID */}
          <PriceTab />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button className="w-full sm:w-[240px] h-[45px]" variant="blue">
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
      <div className="w-full h-[1px]  bg-green mt-8 mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8 mt-8">
        <div className="space-y-6">
          <Gallery images={images} />
        </div>
        <div className="space-y-6">
          {/* Agent Card */}
          <BrokerTab />
          {/* Description */}
          <ObjectDescription />
          {/* Property Info */}
          <ObjectInfo />
          {/* Price and ID */}
          <PriceTab />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button className="w-full sm:w-[240px] h-[45px]" variant="blue">
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
};
