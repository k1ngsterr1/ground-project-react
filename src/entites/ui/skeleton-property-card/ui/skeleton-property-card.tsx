import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonPropertyCard: React.FC = () => {
  return (
    <div className="bg-[#ffffff] min-h-[390px] cursor-pointer rounded-lg shadow-lg transition-all hover:shadow-xl overflow-hidden">
      <div className="relative w-full h-[200px]">
        <Skeleton height={200} />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton height={24} width="75%" />
        <Skeleton height={16} width="100%" />
        <Skeleton height={16} width="85%" />
        <div className="flex items-center justify-between">
          <Skeleton height={24} width="30%" />
          <Skeleton circle={true} height={24} width={24} />
        </div>
      </div>
    </div>
  );
};
