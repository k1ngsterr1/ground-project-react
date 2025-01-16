import { Home, MapPin, Square } from "lucide-react";

interface IObjectInfo {
  type: string;
  location: string;
  square: number;
}

export const ObjectInfo: React.FC<IObjectInfo> = ({
  type,
  location,
  square,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Home className="w-5 h-5 text-[#00a859]" />
        <span>Тип объекта: {type}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#00a859]" />
        <span>Локация: {location}</span>
      </div>
      <div className="flex items-center gap-2">
        <Square className="w-5 h-5 text-[#00a859]" />
        <span>Площадь: {square}кв.м</span>
      </div>
    </div>
  );
};
