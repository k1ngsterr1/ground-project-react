import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/api",
  withCredentials: true,
});
