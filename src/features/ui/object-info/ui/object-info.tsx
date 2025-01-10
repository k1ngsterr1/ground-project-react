import { Home, MapPin, Square } from "lucide-react";

export const ObjectInfo = () => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Home className="w-5 h-5 text-[#00a859]" />
        <span>Тип объекта: Дом</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#00a859]" />
        <span>Локация: Москва</span>
      </div>
      <div className="flex items-center gap-2">
        <Square className="w-5 h-5 text-[#00a859]" />
        <span>Площадь: 600кв.м</span>
      </div>
    </div>
  );
};
