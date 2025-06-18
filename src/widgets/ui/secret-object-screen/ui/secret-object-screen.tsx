import { ObjectDescription } from "@/features/ui/object-description/ui/object-description";
import { Gallery } from "@/features/ui/object-gallery/ui/object-gallery";
import { ObjectInfo } from "@/features/ui/object-info/ui/object-info";
import { PriceTab } from "@/features/ui/price-tab/ui/price-tab";
import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { Button } from "@/shared/ui/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMe } from "@/entites/model/user/user-auth/use-get-me";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { EditPropertyModal } from "@/entites/ui/edit-modal-card/ui/edit-modal-card";
import { FileUpload } from "@/features/ui/file-upload/ui/file-upload";
import { useUpdateProperty } from "@/entites/model/properties/api/use-update-property";
import {
  useAddImageToProperty,
  useRemoveImageFromProperty,
} from "@/entites/model/properties/api/use-image-manage";
import { BrokerTab } from "@/features/ui/broker-tab/ui/broker-tab";

const images = [];

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

type SecretObjectScreenProps = {
  isGround: boolean;
};

export const SecretObjectScreen: React.FC<SecretObjectScreenProps> = ({
  isGround,
}) => {
  const { id } = useParams();
  const { data, isLoading } = useGetProperty(Number(id));
  const { data: myData } = useGetMe();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditingImages, setIsEditingImages] = useState(false);
  const [editImages, setEditImages] = useState<(string | File)[]>(
    data?.image || []
  );
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();
  const { mutate: addImageToPropertyMutation } = useAddImageToProperty();
  const { mutate: removeImageFromPropertyMutation } =
    useRemoveImageFromProperty();

  const handleFileChange = (files: File[]) => {
    setEditImages((prev) => [...prev, ...files]);
  };

  const handleReplaceImage = (idx: number, file: File) => {
    setEditImages((prev) => prev.map((img, i) => (i === idx ? file : img)));
  };

  const handleAddImageUrl = (url: string) => {
    if (!url) return;
    addImageToPropertyMutation({ id: Number(id), imageUrl: url });
  };

  const handleRemoveImage = (imgToRemove: string | File) => {
    setEditImages((prev) =>
      prev.filter((img) => {
        if (typeof imgToRemove === "string") {
          removeImageFromPropertyMutation({
            id: Number(id),
            imageUrl: imgToRemove,
          });
          return img !== imgToRemove;
        } else if (img instanceof File && imgToRemove instanceof File) {
          return !(
            img.name === imgToRemove.name && img.size === imgToRemove.size
          );
        } else if (img instanceof File || imgToRemove instanceof File) {
          return true;
        }
        return true;
      })
    );
  };

  const handleSaveImages = () => {
    const formData = new FormData();
    editImages.forEach((img) => {
      if (typeof img === "string") {
        formData.append("image", img);
      } else if (img instanceof File) {
        formData.append("image", img);
      }
    });
    updateProperty(
      { id: Number(id), data: { image: editImages } as any },
      {
        onSuccess: () => {
          setIsEditingImages(false);
        },
      }
    );
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

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[32px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#2f2f2f] text-left lg:text-left">
              {data?.name}
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,520px] gap-8 mt-8">
            <div className="space-y-6 flex flex-col">
              <Gallery images={data?.image || images} />
              <BrokerTab />
            </div>
            <div className="space-y-6">
              <ObjectDescription text={data?.description} />
              <ObjectInfo
                type={data?.type}
                location={data?.location}
                square={data?.square}
              />
              <PriceTab price={data?.price} number={data?.id} />
            </div>
          </div>
        </div>
        <EditPropertyModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          propertyId={Number(id)}
        />
      </div>
    </>
  );
};
