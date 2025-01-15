import image from "@/assets/catalogue_mockup.png";
import { useShareModalStore } from "@/entites/ui/modal/model/use-share-modal-store";
import { BrokerTab } from "@/features/ui/broker-tab/ui/broker-tab";
import { ObjectDescription } from "@/features/ui/object-description/ui/object-description";
import { Gallery } from "@/features/ui/object-gallery/ui/object-gallery";
import { ObjectInfo } from "@/features/ui/object-info/ui/object-info";
import { PriceTab } from "@/features/ui/price-tab/ui/price-tab";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { Button } from "@/shared/ui/button/button";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useParams } from "react-router-dom";

import { useAddFavorite } from "@/entites/model/favorites/use-add-favorite";
import { useGetMe } from "@/entites/model/user/user-auth/use-get-me";
import { useGetFavorites } from "@/entites/model/favorites/use-get-favorites";
import { useDeleteFavorite } from "@/entites/model/favorites/use-delete-favorite";

import { Heart, HeartOff } from "lucide-react";

const images = Array(7).fill(image);

export const ObjectInnerScreen = () => {
  const { openModal } = useShareModalStore();
  const { mutate: addFavorite } = useAddFavorite();
  const { id: propertyId } = useParams();
  const { data: userData } = useGetMe();
  const { data: favoritesData } = useGetFavorites(userData?.id?.toString() || "");
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const isInFavorites = favoritesData?.some(
    (favorite) => favorite.propertyId.toString() === propertyId
  );

  const handleAddToFavorites = () => {
    const userId = userData?.id.toString();
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Необходимо авторизоваться",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: "bottom-right",
      });
      return;
    }

    if (!userId || !propertyId) {
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Произошла ошибка при добавлении в избранное",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: "bottom-right",
      });
      return;
    }

    if (isInFavorites) {
      deleteFavorite({ userId, propertyId });
      Swal.fire({
        icon: "success",
        title: "Удалено из избранного",
        text: "Объект успешно удален из избранного",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: "bottom-right",
      });
      return;
    }

    addFavorite({ userId, propertyId });
    Swal.fire({
      icon: "success",
      title: "Добавлено в избранное!",
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      position: "bottom-right",
    });
  };

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог домов", href: "/houses-catalogue" },
    { label: "Тестовый объект", href: "/houses-catalogue/1", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
        {/* Title */}
        <h1 className="text-[32px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#2f2f2f] text-left lg:text-left">
          Скандинавский уют
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8 mt-8">
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
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                className="w-full sm:w-[240px] h-[45px] text-sm"
                variant="blue"
                onClick={() => openModal()}
              >
                Поделиться
              </Button>
              <Button
                className="w-full sm:w-[240px] h-[45px]"
                variant={isInFavorites ? "transparent_red" : "transparent_blue"}
                onClick={handleAddToFavorites}
              >
                <div className="flex items-center justify-center gap-2 text-sm">
                  {isInFavorites ? (
                    <>
                      <HeartOff className="w-5 h-5" />
                      Удалить из избранного
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Добавить в избранное
                    </>
                  )}
                </div>
              </Button>
            </div>
            <BrokerTab />
          </div>
        </div>
      </div>
    </div>
  );
};
