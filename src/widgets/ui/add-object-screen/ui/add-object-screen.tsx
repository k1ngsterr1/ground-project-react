import { FileUpload } from "@/features/ui/file-upload/ui/file-upload";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { Select } from "@/shared/ui/selector/selector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAddProperty } from "@/entites/model/favorites/use-add-property";

const propertyTypes = [
  { value: "", label: "Выберите тип объекта" },
  { value: "ground", label: "Земельный участок" },
  { value: "house", label: "Дом" },
];

export const AddObjectScreen = () => {
  const navigate = useNavigate();
  const { mutate: addProperty, isPending } = useAddProperty();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    square: "",
    price: "",
    type: "",
    description: "",
    location: "",
    number: "",
    contact: "",
    agent: true,
    owner: false,
  });

  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleInputChange =
    (name: string) =>
    (
      valueOrEvent:
        | string
        | React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >
    ) => {
      const value =
        typeof valueOrEvent === "string"
          ? valueOrEvent
          : valueOrEvent.target.value;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      agent: value === "agent",
      owner: value === "owner",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type) {
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Выберите тип объекта",
        toast: true,
        position: "bottom-right",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (selectedFiles.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Добавьте хотя бы одно фото",
        toast: true,
        position: "bottom-right",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const propertyData = {
      ...formData,
      square: Number(formData.square),
      price: Number(formData.price),
      image: selectedFiles,
    };

    addProperty(propertyData, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Успешно",
          text: "Объект добавлен",
          toast: true,
          position: "bottom-right",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/houses-catalogue");
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Не удалось добавить объект",
          toast: true,
          position: "bottom-right",
          timer: 3000,
          showConfirmButton: false,
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm cursor-pointer">
              <span className="text-[#2f2f2f]/70" onClick={() => navigate("/")}>
                Главная
              </span>
              <span className="text-[#2f2f2f]/70">•</span>
              <span className="text-[#00a859]">Добавить объект</span>
            </div>
            <h1 className="text-3xl font-bold text-[#2f2f2f] ">
              Добавление объекта
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 shadow-sm space-y-6 "
        >
          <FileUpload onChange={handleFileChange} />

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Название объекта"
                placeholder="Название объекта"
                value={formData.name}
                onChange={handleInputChange("name")}
              />
              <Input
                label="Площадь"
                placeholder="Площадь"
                type="number"
                value={formData.square}
                onChange={handleInputChange("square")}
              />

              <Select
                label="Тип объекта"
                options={propertyTypes}
                value={formData.type}
                onChange={handleInputChange("type")}
              />

              <Input
                label="Цена"
                placeholder="Цена"
                type="number"
                value={formData.price}
                onChange={handleInputChange("price")}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#2f2f2f]">
                Описание
              </label>
              <textarea
                className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#00a859]"
                placeholder="Описание"
                value={formData.description}
                onChange={handleInputChange("description")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Локация"
                placeholder="Локация"
                value={formData.location}
                onChange={handleInputChange("location")}
              />
              <Input
                label="Кадастровый номер"
                placeholder="Кадастровый номер"
                value={formData.number}
                onChange={handleInputChange("number")}
              />
              <Input
                label="Контакт продавца"
                placeholder="Контакт продавца"
                value={formData.contact}
                onChange={handleInputChange("contact")}
              />
              <Select
                label="Агент / Собственник"
                options={[
                  { value: "agent", label: "Агент" },
                  { value: "owner", label: "Собственник" },
                ]}
                value={formData.agent ? "agent" : "owner"}
                onChange={handleSelectChange}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#00a859] text-white hover:bg-[#00a859]/90"
              >
                {isPending ? "Добавление..." : "Добавить объект"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
