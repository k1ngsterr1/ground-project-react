"use client";

import { apiClient } from "@/shared/config/apiClient";
import { IGetMeRDO } from "./rdo/get-me.rdo";

export const getMe = async (): Promise<IGetMeRDO> => {
  try {
    const { data } = await apiClient.get<IGetMeRDO>("/users/info/me");

    return data;
  } catch (error) {
    console.log("There was an error with my data", error);
    throw new Error("Failed to fetch my data");
  }
};
