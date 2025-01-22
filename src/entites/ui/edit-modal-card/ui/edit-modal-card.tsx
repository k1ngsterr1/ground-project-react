import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { FileUpload } from "@/features/ui/file-upload/ui/file-upload";
import { useUpdateProperty } from "@/entites/model/properties/api/use-update-property";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import { motion, AnimatePresence } from "framer-motion";

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

export const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  isOpen,
  onClose,
  propertyId,
}) => {
  const { data: propertyData, isLoading } = useGetProperty(propertyId);
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();

  const [formDataState, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    square: "",
    type: "",
    location: "",
    image: [], // Существующие пути к фотографиям
  });

  useEffect(() => {
    if (isOpen && propertyData) {
      setFormData((prev: any) => ({
        ...prev,
        name: propertyData.name || "",
        description: propertyData.description || "",
        price: propertyData.price?.toString() || "",
        square: propertyData.square?.toString() || "",
        type: propertyData.type || "",
        location: propertyData.location || "",
        image: propertyData.image || [], // Загружаем существующие пути
      }));
    }
  }, [isOpen, propertyData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (files: File[]) => {
    setFormData((prev: any) => {
      const existingImages = prev.image || [];
      const newImages = files.filter(
        (file) => !existingImages.some((img: any) => img.name === file.name) // Убираем дубли
      );
      return {
        ...prev,
        image: [...existingImages, ...newImages],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Создаём объект FormData
    const formData = new FormData();

    // Добавляем поля из formData в FormData
    formData.append("name", formDataState.name); // Используйте state вместо обращения к самому объекту FormData
    formData.append("description", formDataState.description);
    formData.append("price", formDataState.price);
    formData.append("square", formDataState.square);
    formData.append("type", formDataState.type);
    formData.append("location", formDataState.location);

    // Добавляем существующие ссылки как строки
    formDataState.image.forEach((img) => {
      if (typeof img === "string") {
        formData.append("image", img); // Ссылки на изображения
      }
    });

    // Добавляем новые файлы
    formDataState.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img); // Новые файлы
      }
    });

    // Отправляем данные на сервер
    updateProperty(
      { id: propertyId, data: formDataState as any },
      {
        onSuccess: (response) => {
          onClose();
        },
        onError: (error) => {},
      }
    );
  };

  if (isLoading) {
    return null; // Можно добавить индикатор загрузки
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Редактировать объект
            </h2>
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto max-h-[70vh] space-y-4"
            >
              <Input
                label="Название объекта"
                value={formDataState.name}
                onChange={(value) => handleInputChange("name", value)}
              />
              <Input
                label="Описание"
                value={formDataState.description}
                onChange={(value) => handleInputChange("description", value)}
              />
              <Input
                label="Цена"
                type="number"
                value={formDataState.price}
                onChange={(value) => handleInputChange("price", value)}
              />
              <Input
                label="Площадь"
                type="number"
                value={formDataState.square}
                onChange={(value) => handleInputChange("square", value)}
              />
              <Input
                label="Локация"
                value={formDataState.location}
                onChange={(value) => handleInputChange("location", value)}
              />
              <FileUpload onChange={handleFileChange} />
              <div className="flex justify-end space-x-4 mt-4">
                <Button onClick={onClose} type="button" className="px-4 py-2">
                  Отмена
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-[#00a859] text-white px-4 py-2"
                >
                  {isUpdating ? "Сохранение..." : "Сохранить"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
