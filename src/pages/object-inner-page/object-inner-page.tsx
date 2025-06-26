import { ShareModal } from "@/entites/ui/modal/ui/share-modal";
import { ObjectInnerScreen } from "@/widgets/ui/object-inner-screen/ui/object-inner-screen";
import { useParams } from "react-router-dom";
import { useGetProperty } from "@/entites/model/properties/api/use-get-property";
import { Helmet } from "react-helmet-async";

type ObjectInnerPageProps = {
  isGround: boolean;
};

export const ObjectInnerPage: React.FC<ObjectInnerPageProps> = ({
  isGround,
}) => {
  const { id } = useParams();
  const { data: property } = useGetProperty(Number(id));

  // Generate dynamic meta content
  const getMetaContent = () => {
    if (!property) {
      return {
        title: "Загрузка... - Недвижимость",
        description: "Загрузка информации об объекте недвижимости",
        image: "",
        url: window.location.href,
      };
    }

    const title = `${property.name} - Недвижимость`;
    const description =
      property.description ||
      `${property.name} в ${property.location}. Площадь: ${
        property.square
      } м². Цена: ${property.price?.toLocaleString()} ₽`;
    const image =
      property.image && property.image.length > 0 ? property.image[0] : "";
    const url = window.location.href;

    return { title, description, image, url };
  };

  const { title, description, image, url } = getMetaContent();

  // Log for debugging
  console.log("Meta data for sharing:", { title, description, image, url });

  return (
    <>
      <Helmet>
        {/* Basic meta tags */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={property?.name || "Недвижимость"} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        {image && (
          <>
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/jpeg" />
            <meta
              property="og:image:alt"
              content={property?.name || "Объект недвижимости"}
            />
          </>
        )}
        <meta property="og:site_name" content="Недвижимость" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property?.name || "Недвижимость"} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
        {image && <meta property="telegram:image" content={image} />}

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />

        {/* Structured data for better SEO */}
        {property && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstate",
              name: property.name,
              description: description,
              image: image,
              url: url,
              floorSize: {
                "@type": "QuantitativeValue",
                value: property.square,
                unitCode: "MTK",
              },
              offers: {
                "@type": "Offer",
                price: property.price,
                priceCurrency: "RUB",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: property.location,
              },
            })}
          </script>
        )}
      </Helmet>
      <ObjectInnerScreen isGround={isGround} />
      <ShareModal />
    </>
  );
};
