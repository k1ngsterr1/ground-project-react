import { BrokerTab } from "@/features/ui/broker-tab/ui/broker-tab";
import { ObjectDescription } from "@/features/ui/object-description/ui/object-description";
import { Gallery } from "@/features/ui/object-gallery/ui/object-gallery";
import { ObjectInfo } from "@/features/ui/object-info/ui/object-info";
import { PriceTab } from "@/features/ui/price-tab/ui/price-tab";
import { Heart, HeartOff, Trash } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import image from "@/assets/catalogue_mockup.png";
import { useShareModalStore } from "@/entites/ui/modal/model/use-share-modal-store";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { Button } from "@/shared/ui/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { useAddFavorite } from "@/entites/model/favorites/use-add-favorite";
import { useGetMe } from "@/entites/model/user/user-auth/use-get-me";
import { useGetFavorites } from "@/entites/model/favorites/use-get-favorites";
import { useDeleteFavorite } from "@/entites/model/favorites/use-delete-favorite";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDeleteProperty } from "@/entites/model/properties/api/use-delete-property";
import { useState } from "react";
import { EditPropertyModal } from "@/entites/ui/edit-modal-card/ui/edit-modal-card";

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

type ObjectInnerScreenProps = {
  isGround: boolean;
};

export const ObjectInnerScreen: React.FC<ObjectInnerScreenProps> = ({
  isGround,
}) => {
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isInFavorites = favoritesData?.some(
    (favorite) => favorite.propertyId.toString() === propertyId
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const handleAddToFavorites = () => {
    const userId = userData?.id.toString();
    if (!userId) {
      return;
    }

    if (!userId || !propertyId) {
      return;
    }

    if (isInFavorites) {
      deleteFavorite({ userId, propertyId });

      return;
    }

    addFavorite({ userId, propertyId });
  };

  const handleDelete = (propertyID: number) => {
    deleteProperty(propertyID, {
      onSuccess: () => {
        if (isGround) {
          navigate("/ground-catalogue");
        } else {
          navigate("/houses-catalogue");
        }
      },
      onError: (error) => {
        console.error("Error deleting property:", error);
      },
    });
  };

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    {
      label: isGround ? "Каталог участков" : "Каталог домов",
      href: isGround ? "/ground-catalogue" : "/houses-catalogue",
    },
    {
      label: `${data?.name}`,
      href: isGround
        ? `/ground-catalogue/${data?.id}`
        : `/houses-catalogue/${data?.id}`,
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
          <div className="flex items-center gap-4">
            {["manager", "admin"].includes(myData?.role as string) && (
              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-blue-500 text-white"
              >
                Редактировать объект
              </Button>
            )}
            {myData?.role === "admin" && (
              <Trash
                onClick={() => handleDelete(Number(id))}
                className="text-red-500 cursor-pointer transition-colors hover:text-red-700"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8 mt-8">
          <div className="space-y-6 flex flex-col">
            <Gallery images={data?.image || images} />
            {["admin", "manager"].includes(myData?.role as string) ? (
              <>
                <span className="mt-12 text-xl">
                  {data.agent && (
                    <span className="text-green">Собственник</span>
                  )}
                </span>
                <span className="mt-12 text-xl">
                  {data.owner && <span className="text-green">Владелец</span>}
                </span>
                <span className="mt-12 text-xl">
                  Кадастровый номер: {data.number}
                </span>
                <span className="mt-12 text-xl">
                  {
                    <span className="text-black">
                      Ссылка на объявление:{" "}
                      <a href={data.link} className="text-green">
                        {data.link}{" "}
                      </a>
                    </span>
                  }
                </span>
              </>
            ) : null}
            {myData?.role === "admin" ? (
              <>
                <span className="mt-12 text-xl">
                  Контакт продавца:
                  <a href={`tel:${data.contact}`} className="text-green">
                    {data.contact}
                  </a>
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
            <PriceTab price={data?.price} number={data?.id} />
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
      <EditPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        propertyId={Number(id)}
      />
    </div>
  );
};
