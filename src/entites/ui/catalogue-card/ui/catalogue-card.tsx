import React from "react";

interface ICatalogueCard {
  name: string;
  icon: React.ReactNode;
  quantity: number;
  onClick: () => void;
}

export const CatalogueCard: React.FC<ICatalogueCard> = ({
  name,
  icon,
  quantity,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="2xl:w-[400px] 2xl:h-[400px] xl:w-[300px] xl:h-[300px] w-[300px] h-[300px] rounded-[20px] bg-[#F0F0F0]/60 flex flex-col items-center justify-center gap-8 cursor-pointer transition-colors hover:bg-[#F0F0F0] "
    >
      <span className="text-green text-[32px]">{name}</span>
      {icon}
      <span className="text-green">Количество: {quantity}</span>
    </div>
  );
};
