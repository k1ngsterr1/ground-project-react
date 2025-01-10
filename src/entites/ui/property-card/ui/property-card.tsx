import React from "react";
import { GitCompare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export const PropertyCard: React.FC<CardProps> = ({
  image,
  title,
  description,
  price,
}) => {
  const navigate = useNavigate();

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
          <GitCompare className="text-[#E7E7E7] transition-colors cursor-pointer hover:text-green" />
        </div>
      </div>
    </div>
  );
};
