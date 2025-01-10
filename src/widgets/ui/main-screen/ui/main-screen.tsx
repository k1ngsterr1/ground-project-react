import { useNavigate } from "react-router-dom";
import { CatalogueCard } from "../../../../entites/ui/catalogue-card/ui/catalogue-card";
import { HouseIcon, MapPinHouse } from "lucide-react";

export const MainScreen = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full h-[100vh] flex flex-col items-center justify-center px-4">
      {/* Заголовок */}
      <h1 className="text-dark text-[24px] sm:text-[32px] md:text-[40px] 2xl:text-[48px] font-bold text-center">
        Добро пожаловать в наш каталог недвижимости!
      </h1>
      {/* Описание */}
      <span className="text-dark text-[16px] sm:text-[18px] md:text-[20px] mt-4 text-center">
        Удобный инструмент для выбора дома или участка вашей мечты.
      </span>
      {/* Карточки */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
        <CatalogueCard
          onClick={() => navigate("/houses-catalogue")}
          name="Каталог домов"
          icon={
            <HouseIcon
              className="text-green"
              width={64}
              height={64}
              strokeWidth={1}
            />
          }
          quantity="1"
        />
        <CatalogueCard
          onClick={() => navigate("/ground-catalogue")}
          name="Каталог участков"
          icon={
            <MapPinHouse
              className="text-green"
              width={64}
              height={64}
              strokeWidth={1}
            />
          }
          quantity="1"
        />
      </div>
    </main>
  );
};
