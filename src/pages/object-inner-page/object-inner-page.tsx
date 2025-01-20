import { ShareModal } from "@/entites/ui/modal/ui/share-modal";
import { ObjectInnerScreen } from "@/widgets/ui/object-inner-screen/ui/object-inner-screen";

type ObjectInnerPageProps = {
  isGround: boolean;
};

export const ObjectInnerPage: React.FC<ObjectInnerPageProps> = ({
  isGround,
}) => {
  return (
    <>
      <ObjectInnerScreen isGround={isGround} />
      <ShareModal />
    </>
  );
};
