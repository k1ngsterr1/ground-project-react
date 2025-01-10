import { FileUpload } from "@/features/ui/file-upload/ui/file-upload";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { Select } from "@/shared/ui/selector/selector";

const propertyTypes = [
  { value: "", label: "Выберите тип объекта" },
  { value: "house", label: "Дом" },
  { value: "apartment", label: "Квартира" },
  { value: "land", label: "Земельный участок" },
  { value: "commercial", label: "Коммерческая недвижимость" },
];

export const AddObjectScreen = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#2f2f2f]/70">Главная</span>
              <span className="text-[#2f2f2f]/70">•</span>
              <span className="text-[#00a859]">Кабинет Менеджера</span>
            </div>
            <h1 className="text-3xl font-bold text-[#2f2f2f]">
              Добавление объекта
            </h1>
          </div>
          <Button
            variant="outline"
            className="text-[#00a859] border-[#00a859] hover:bg-[#00a859]/5"
          >
            Все объекты
          </Button>
        </div>

        {/* Form */}
        <form className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          <FileUpload />

          <div className="space-y-6">
            <Input
              label="Ссылка на объявление"
              placeholder="Ссылка на объявление"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Название объекта" placeholder="Название объекта" />
              <Input label="Площадь" placeholder="Площадь" type="number" />

              <Select
                label="Тип объекта"
                options={propertyTypes}
                name="propertyType"
                required
              />

              <Input label="Цена" placeholder="Цена" type="number" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#2f2f2f]">
                Описание
              </label>
              <textarea
                className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#00a859]"
                placeholder="Описание"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Локация" placeholder="Локация" />
              <Input
                label="Кадастровый номер"
                placeholder="Кадастровый номер"
              />
              <Input label="Контакт продавца" placeholder="Контакт продавца" />
              <Input
                label="Агент / Собственник"
                placeholder="Агент / Собственник"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#00a859] text-white hover:bg-[#00a859]/90"
              >
                Добавить объект
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
