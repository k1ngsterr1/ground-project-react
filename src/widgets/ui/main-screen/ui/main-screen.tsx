import { useNavigate } from "react-router-dom";
import { CatalogueCard } from "../../../../entites/ui/catalogue-card/ui/catalogue-card";
import { HouseIcon, MapPinHouse } from "lucide-react";

export const MainScreen = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full h-[100vh]  flex flex-col items-center justify-center">
      <h1 className="text-dark xl:text-[40px] 2xl:text-[48px] font-bold">
        Добро пожаловать в наш каталог недвижимости!
      </h1>
      <span className="text-dark text-[20px] mt-4">
        Удобный инструмент для выбора дома или участка вашей мечты.
      </span>
      <div className="flex items-center justify-center gap-5 mt-8">
        <CatalogueCard
          onClick={() => navigate("/houses-catalogue")}
          name="Каталог домов"
          icon={
            <HouseIcon
              className="text-green"
              width={96}
              height={96}
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
              width={96}
              height={96}
              strokeWidth={1}
            />
          }
          quantity="1"
        />
      </div>
    </main>
  );
};
