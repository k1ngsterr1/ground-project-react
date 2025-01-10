import { Gallery } from "@/features/ui/object-gallery/ui/object-gallery";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import image from "@/assets/catalogue_mockup.png";
import { BrokerTab } from "@/features/ui/broker-tab/ui/broker-tab";
import { PriceTab } from "@/features/ui/price-tab/ui/price-tab";
import { ObjectInfo } from "@/features/ui/object-info/ui/object-info";
import { ObjectDescription } from "@/features/ui/object-description/ui/object-description";
import { Button } from "@/shared/ui/button/button";

const images = Array(7).fill(image);

export const ObjectInnerScreen = () => {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог домов", href: "/houses-catalogue" },
    { label: "Тестовый объект", href: "/houses-catalogue/1", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
        {/* Title */}
        <h1 className="text-[48px] font-bold text-[#2f2f2f] ">
          Скандинавский уют
        </h1>
        <div className="grid lg:grid-cols-[1fr,520px] gap-8 mt-8">
          <div className="space-y-6">
            <Gallery images={images} />
          </div>
          <div className="space-y-6">
            {/* Description */}
            <ObjectDescription />
            {/* Property Info */}
            <ObjectInfo />
            {/* Price and ID */}
            <PriceTab />
            <div className="flex items-center gap-4">
              <Button className="w-[240px] h-[45px]" variant="blue">
                Поделиться
              </Button>
              <Button className="w-[240px] h-[45px]" variant="transparent_blue">
                <div className="flex items-center justify-center gap-2">
                  Добавить в избранное
                </div>
              </Button>
            </div>
            {/* Agent Card */}
            <BrokerTab />
          </div>
        </div>
      </div>
    </div>
  );
};
