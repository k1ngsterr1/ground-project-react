interface IPriceTab {
  price: number;
  number: number; // Кадастровый номер объекта
}

export const PriceTab: React.FC<IPriceTab> = ({ price, number }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU");
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center gap-4">
        <span className="text-[32px] font-bold text-green">
          {formatPrice(price)}₽
        </span>
        <span className="text-dark xl:text-[18px] 2xl:text-[20px] w-full">
          ID объекта: {number}
        </span>
      </div>
    </div>
  );
};
