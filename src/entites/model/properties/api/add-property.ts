import { apiClient } from "@/shared/config/apiClient";
import { IGetPropertiesRDO } from "../rdo/get-properties.rdo";
import { AddPropertyDTO } from "../dto/add-property.dto";

export const addProperty = async (
  data: AddPropertyDTO
): Promise<IGetPropertiesRDO> => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value.toString());
      }
    });

    data.image.forEach((file) => {
      formData.append(`image`, file);
    });

    const { data: responseData } = await apiClient.post<IGetPropertiesRDO>(
      "/properties",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return responseData;
  } catch (error) {
    console.error("Failed to add property:", error);
    throw error;
  }
};
