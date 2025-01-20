import { apiClient } from "@/shared/config/apiClient";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";
import { UpdatePropertyDTO } from "./update-property.dto";

export const updateProperty = async (
  id: number,
  data: UpdatePropertyDTO
): Promise<IGetPropertiesRDO> => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value.toString());
      }
    });

    if (data.image) {
      data.image.forEach((file) => {
        formData.append(`image`, file);
      });
    }

    const { data: responseData } = await apiClient.patch<IGetPropertiesRDO>(
      `/properties/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return responseData;
  } catch (error) {
    console.error("Failed to update property:", error);
    throw error;
  }
};
