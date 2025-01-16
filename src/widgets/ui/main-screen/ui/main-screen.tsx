import { HouseIcon, MapPinHouse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CatalogueCard } from "../../../../entites/ui/catalogue-card/ui/catalogue-card";
import { useGetProperties } from "@/entites/model/properties/api/use-get-properties";
import { useGetMe } from "@/entites/model/user/user-auth/use-get-me";
import { Button } from "@/shared/ui/button/button";

export const MainScreen = () => {
  const navigate = useNavigate();
  const { data: properties } = useGetProperties();
  const { data: myData } = useGetMe();

  const groundProperties = properties?.filter(
    (property) => property.type === "ground"
  );

  const houseProperties = properties?.filter(
    (property) => property.type === "house"
  );

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
          quantity={Number(houseProperties?.length)}
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
          quantity={Number(groundProperties?.length)}
        />
      </div>
      {(myData?.role == "admin" || "manager") && (
        <Button
          type="submit"
          onClick={() => navigate("/add-object")}
          className="bg-[#00a859] text-white hover:bg-[#00a859]/90 mt-8"
        >
          Добавить объект
        </Button>
      )}
    </main>
  );
};
