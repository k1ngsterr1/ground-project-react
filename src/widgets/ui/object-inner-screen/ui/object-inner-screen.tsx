import { BrokerTab } from "@/features/ui/broker-tab/ui/broker-tab";
import { ObjectDescription } from "@/features/ui/object-description/ui/object-description";
import { Gallery } from "@/features/ui/object-gallery/ui/object-gallery";
import { ObjectInfo } from "@/features/ui/object-info/ui/object-info";
import { PriceTab } from "@/features/ui/price-tab/ui/price-tab";
import { Heart, HeartOff, Trash } from "lucide-react";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import image from "@/assets/catalogue_mockup.png";
import { useShareModalStore } from "@/entites/ui/modal/model/use-share-modal-store";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { Button } from "@/shared/ui/button/button";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAddFavorite } from "@/entites/model/favorites/use-add-favorite";
import { useGetMe } from "@/entites/model/user/user-auth/use-get-me";
import { useGetFavorites } from "@/entites/model/favorites/use-get-favorites";
import { useDeleteFavorite } from "@/entites/model/favorites/use-delete-favorite";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDeleteProperty } from "@/entites/model/properties/api/use-delete-property";

const images = Array(7).fill(image);

const SkeletonLoader = () => (
  <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16">
    <div className="max-w-7xl mx-auto">
      <Skeleton width={150} height={24} className="mb-4" />
      <Skeleton width={300} height={40} className="mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8">
        <div className="space-y-6">
          <Skeleton height={300} />
          <Skeleton height={50} />
        </div>
        <div className="space-y-6">
          <Skeleton count={4} height={20} />
          <Skeleton height={200} />
          <Skeleton height={50} width={200} />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Skeleton height={45} width={240} />
            <Skeleton height={45} width={240} />
          </div>
          <Skeleton height={150} />
        </div>
      </div>
    </div>
  </div>
);

export const ObjectInnerScreen = () => {
  const { openModal } = useShareModalStore();
  const { id } = useParams();
  const { data, isLoading } = useGetProperty(Number(id));
  const { data: myData } = useGetMe();
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteProperty } = useDeleteProperty();
  const { id: propertyId } = useParams();
  const { data: userData } = useGetMe();
  const navigate = useNavigate();
  const { data: favoritesData } = useGetFavorites(
    userData?.id?.toString() || ""
  );
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const isInFavorites = favoritesData?.some(
    (favorite) => favorite.propertyId.toString() === propertyId
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

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

  const handleDelete = (propertyID: number) => {
    deleteProperty(propertyID, {
      onSuccess: () => {
        if (data?.type == "land") {
          navigate("/houses-catalogue");
        } else {
          navigate("/ground-catalogue");
        }
      },
      onError: (error) => {
        console.error("Error deleting property:", error);
      },
    });
  };

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог домов", href: "/houses-catalogue" },
    {
      label: `${data?.name}`,
      href: `/houses-catalogue/${data?.id}`,
      isActive: true,
    },
  ];

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[32px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#2f2f2f] text-left lg:text-left">
            {data?.name}
          </h1>
          {myData?.role === "admin" && (
            <Trash
              onClick={() => handleDelete(Number(id))}
              className="text-red-500 cursor-pointer transition-colors hover:text-red-700"
            />
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8 mt-8">
          <div className="space-y-6 flex flex-col">
            <Gallery images={data?.image || images} />
            {myData?.role === "admin" ? (
              <>
                <span className="mt-12 text-2xl">
                  Контакт продавца:
                  <a href={`tel:${data.contact}`} className="text-green">
                    {data.contact}
                  </a>
                </span>
                <span className="mt-12 text-2xl">
                  {data.agent && (
                    <span className="text-green">Собственник</span>
                  )}
                </span>
                <span className="mt-12 text-2xl">
                  {data.owner && <span className="text-green">Владелец</span>}
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="space-y-6">
            <ObjectDescription text={data?.description} />
            {myData?.role === "admin" && (
              <ObjectInfo
                type={data?.type}
                location={data?.location}
                square={data?.square}
              />
            )}
            <PriceTab price={data?.price} number={data?.number} />
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
