"use client";

import { apiClient } from "@/shared/config/apiClient";
import { IGetUsersRDO } from "./rdo/get-users.rdo";

export const getUsers = async (): Promise<IGetUsersRDO[]> => {
  try {
    const { data } = await apiClient.get<IGetUsersRDO[]>("/users");

    return data;
  } catch (error) {
    console.log("There was an error with my data", error);
    throw new Error("Failed to fetch my data");
  }
};
