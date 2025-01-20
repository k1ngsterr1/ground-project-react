import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { FileUpload } from "@/features/ui/file-upload/ui/file-upload";
import { useUpdateProperty } from "@/entites/model/properties/api/use-update-property";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

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

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    square: "",
    type: "",
    location: "",
    image: [],
  });

  // Логируем загрузку данных с сервера
  useEffect(() => {
    console.log("Состояние isOpen:", isOpen);
    console.log("Полученные данные с сервера:", propertyData);

    if (isOpen && propertyData) {
      const updatedFormData = {
        name: propertyData.name || "",
        description: propertyData.description || "",
        price: propertyData.price?.toString() || "",
        square: propertyData.square?.toString() || "",
        type: propertyData.type || "",
        location: propertyData.location || "",
        image: propertyData.image || [],
      };

      console.log("Форма после загрузки данных:", updatedFormData);
      setFormData(updatedFormData);
    }
  }, [isOpen, propertyData]);

  const handleInputChange = (field: string, value: string) => {
    console.log(`Изменение поля "${field}":`, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log("Текущее состояние формы после изменения:", {
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (files: File[]) => {
    console.log("Изменение файлов:", files);
    setFormData((prev) => ({ ...prev, image: files }));
    console.log("Текущее состояние формы после добавления файлов:", {
      ...formData,
      image: files,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Данные перед отправкой:", formData);

    // Отправляем актуальные данные из состояния
    updateProperty(
      { id: propertyId, data: formData },
      {
        onSuccess: () => {
          console.log("Успешное обновление объекта");
          Swal.fire({
            icon: "success",
            title: "Успешно",
            text: "Объект успешно обновлен",
            toast: true,
            position: "bottom-right",
            timer: 3000,
            showConfirmButton: false,
          });
          onClose();
        },
        onError: (error) => {
          console.error("Ошибка обновления объекта:", error);
          Swal.fire({
            icon: "error",
            title: "Ошибка",
            text: "Не удалось обновить объект",
            toast: true,
            position: "bottom-right",
            timer: 3000,
            showConfirmButton: false,
          });
        },
      }
    );
  };

  if (isLoading) {
    console.log("Загрузка данных...");
    return null; // Можно добавить загрузочный индикатор
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Название объекта"
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
              />
              <Input
                label="Описание"
                value={formData.description}
                onChange={(value) => handleInputChange("description", value)}
              />
              <Input
                label="Цена"
                type="number"
                value={formData.price}
                onChange={(value) => handleInputChange("price", value)}
              />
              <Input
                label="Площадь"
                type="number"
                value={formData.square}
                onChange={(value) => handleInputChange("square", value)}
              />
              <Input
                label="Локация"
                value={formData.location}
                onChange={(value) => handleInputChange("location", value)}
              />
              <FileUpload onChange={handleFileChange} />
              <div className="flex justify-end space-x-4">
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
