import { useComparisonStore } from "@/entites/model/comparison-store/use-comparison-store";
import { GitCompare } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  id: number;
}

export const PropertyCard: React.FC<CardProps> = ({
  image,
  title,
  description,
  price,
  id,
}) => {
  const navigate = useNavigate();
  const { addId, removeId, selectedIds } = useComparisonStore();

  const isSelected = selectedIds.includes(id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeId(id);
    } else {
      addId(id);
    }
  };

  return (
    <div
      onClick={() => navigate("/houses-catalogue/1")}
      className="bg-[#ffffff] min-h-[390px] cursor-pointer rounded-lg shadow-lg transition-all hover:shadow-xl overflow-hidden"
    >
      <div className="relative">
        <img src={image} alt={title} className="object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-[22px] font-semibold text-[#2f2f2f]">{title}</h3>
        <p className="text-[#2f2f2f]/70 text-[16px] ">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-[#00a859] text-[20px] font-semibold">
            {new Intl.NumberFormat("ru-RU").format(price)}₽
          </p>
          <div className="relative group">
            <GitCompare
              onClick={handleCompareClick}
              className={`transition-colors cursor-pointer ${
                isSelected ? "text-green" : "text-[#E7E7E7]"
              } hover:text-green`}
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {isSelected ? "Убрать" : "Сравнить"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
