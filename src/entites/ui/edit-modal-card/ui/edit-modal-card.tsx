import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { FileUpload } from "@/features/ui/file-upload/ui/file-upload";
import { useUpdateProperty } from "@/entites/model/properties/api/use-update-property";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import { motion, AnimatePresence } from "framer-motion";
import { Select } from "@/shared/ui/selector/selector";
import {
  useAddImageToProperty,
  useRemoveImageFromProperty,
} from "@/entites/model/properties/api/use-image-manage";

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

const propertyTypes = [
  { value: "", label: "Выберите тип объекта" },
  { value: "ground", label: "Земельный участок" },
  { value: "house", label: "Дом" },
];

// Type guard for File
function isFile(obj: any): obj is File {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.name === "string" &&
    typeof obj.size === "number"
  );
}

export const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  isOpen,
  onClose,
  propertyId,
}) => {
  const { data: propertyData, isLoading } = useGetProperty(propertyId);
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();
  const { mutate: addImageToPropertyMutation } = useAddImageToProperty();
  const { mutate: removeImageFromPropertyMutation } =
    useRemoveImageFromProperty();

  const [formDataState, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    square: "",
    type: "",
    details: "",
    number: "",
    location: "",
    image: [] as (string | File)[], // Существующие пути к фотографиям
  });
  const [addImageUrlInput, setAddImageUrlInput] = useState("");

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

  // Заменить одну фотографию по индексу
  const handleReplaceImage = (idx: number, file: File) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.map((img, i) => (i === idx ? file : img)),
    }));
  };

  // Добавить существующую ссылку через ручку add-image
  const handleAddImageUrl = (url: string) => {
    if (!url) return;
    addImageToPropertyMutation({ id: propertyId, imageUrl: url });
    setFormData((prev) => ({ ...prev, image: [...prev.image, url] }));
  };

  // Удалить существующую ссылку через ручку remove-image
  const handleRemoveImage = (imgToRemove: string | File) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((img) => {
        if (typeof imgToRemove === "string") {
          removeImageFromPropertyMutation({
            id: propertyId,
            imageUrl: imgToRemove,
          });
          return img !== imgToRemove;
        } else if (isFile(img) && isFile(imgToRemove)) {
          const fileImg = img as File;
          const fileToRemove = imgToRemove as File;
          return !(
            fileImg.name === fileToRemove.name &&
            fileImg.size === fileToRemove.size
          );
        } else if (isFile(img) || isFile(imgToRemove)) {
          return true;
        }
        return true;
      }),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Создаём объект FormData
    const formData = new FormData();
    // Добавляем поля из formData в FormData
    formData.append("name", formDataState.name);
    formData.append("description", formDataState.description);
    formData.append("price", formDataState.price);
    formData.append("square", formDataState.square);
    formData.append("type", formDataState.type);
    formData.append("location", formDataState.location);
    // Добавляем существующие ссылки как строки
    formDataState.image.forEach((img) => {
      if (typeof img === "string") {
        formData.append("image", img);
      }
    });
    // Добавляем новые файлы
    formDataState.image.forEach((img) => {
      if (isFile(img)) {
        formData.append("image", img);
      }
    });
    // Отправляем данные на сервер
    updateProperty(
      { id: propertyId, data: formDataState as any },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {},
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
              {/* Высокий textarea для описания */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Описание
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2 min-h-[120px] resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={formDataState.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Введите подробное описание объекта"
                />
              </div>
              <Input
                label="Кадастровый номер"
                value={formDataState.number}
                onChange={(value) => handleInputChange("number", value)}
              />
              <Input
                label="Примечание"
                value={formDataState.details}
                onChange={(value) => handleInputChange("details", value)}
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
              {/* <Select
                label="Тип объекта"
                options={propertyTypes}
                value={formDataState.type}
                onChange={handleInputChange("type")}
              /> */}

              <Input
                label="Локация"
                value={formDataState.location}
                onChange={(value) => handleInputChange("location", value)}
              />
              {/* Image preview and management */}
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {formDataState.image.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 border rounded overflow-hidden flex flex-col items-center justify-center bg-gray-100"
                    >
                      {typeof img === "string" ? (
                        <img
                          src={img}
                          alt="property"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(img)}
                          alt="new upload"
                          className="object-cover w-full h-full"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute bottom-1 left-1 w-5/6 opacity-80 cursor-pointer"
                        title="Заменить изображение"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0])
                            handleReplaceImage(idx, e.target.files[0]);
                        }}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        onClick={() => handleRemoveImage(img)}
                        title="Удалить изображение"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {/* Добавить по ссылке */}
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Вставьте ссылку на изображение"
                    value={addImageUrlInput || ""}
                    onChange={(v) => setAddImageUrlInput(v)}
                  />
                  <Button
                    type="button"
                    className="bg-blue-400 text-white text-xs"
                    onClick={() => {
                      if (addImageUrlInput) {
                        handleAddImageUrl(addImageUrlInput);
                        setAddImageUrlInput("");
                      }
                    }}
                  >
                    Добавить по ссылке
                  </Button>
                </div>
              </div>
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
