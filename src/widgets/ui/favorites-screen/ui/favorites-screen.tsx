import { Breadcrumb } from "@/shared/ui/breadcrumbs/breadcrumbs";

export const FavoritesScreen = () => {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Избранное", href: "/favorites", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 sm:px-6 py-4 sm:py-6 mt-[60px] sm:mt-16">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 ">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#2f2f2f]">
            Избранное
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Тут рендеришь PropertyCard, но из favorites */}
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-8"></div>
    </div>
  );
};
