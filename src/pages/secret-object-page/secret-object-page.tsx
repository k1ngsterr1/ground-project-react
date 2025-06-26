import { SecretObjectScreen } from "@/widgets/ui/secret-object-screen/ui/secret-object-screen";
import { useParams } from "react-router-dom";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import { useEffect } from "react";

type SecretObjectPageProps = {
  isGround: boolean;
};

export const SecretObjectPage: React.FC<SecretObjectPageProps> = ({
  isGround,
}) => {
  const { id } = useParams();
  const { data: property } = useGetProperty(Number(id));

  useEffect(() => {
    if (property) {
      // Update document title
      document.title = `${property.name} - Недвижимость с контактами`;

      // Update or create meta tags
      const updateMetaTag = (
        name: string,
        content: string,
        property?: string
      ) => {
        let meta = document.querySelector(
          `meta[${property || "name"}="${name}"]`
        );
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute(property || "name", name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      // Basic meta tags
      updateMetaTag(
        "description",
        property.description ||
          `${property.name} - ${property.location}. Контакты включены.`
      );

      // Open Graph meta tags
      updateMetaTag("og:title", `${property.name} - с контактами`, "property");
      updateMetaTag(
        "og:description",
        property.description ||
          `${property.name} в ${property.location}. Площадь: ${
            property.square
          } м². Цена: ${property.price?.toLocaleString()} ₽. Контакты включены.`,
        "property"
      );
      updateMetaTag("og:type", "website", "property");
      updateMetaTag("og:url", window.location.href, "property");

      // Use first image as og:image if available
      if (property.image && property.image.length > 0) {
        updateMetaTag("og:image", property.image[0], "property");
        updateMetaTag("og:image:width", "1200", "property");
        updateMetaTag("og:image:height", "630", "property");
      }

      // Twitter Card meta tags
      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag("twitter:title", `${property.name} - с контактами`);
      updateMetaTag(
        "twitter:description",
        property.description ||
          `${property.name} в ${property.location}. Контакты включены.`
      );
      if (property.image && property.image.length > 0) {
        updateMetaTag("twitter:image", property.image[0]);
      }
    }
  }, [property]);

  return (
    <>
      <SecretObjectScreen isGround={isGround} />
    </>
  );
};
