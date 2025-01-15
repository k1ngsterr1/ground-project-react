import { checkUserToken } from "@/entites/model/user/user-auth/check-token.api";
import { useAuthStore } from "@/entites/model/user/user-auth/use-auth-store";
import { useEffect } from "react";

export const useCheckSession = () => {
  const { setAuthorized, setLoading, setType, isLoading, isAuthorized } =
    useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const isValidUser = await checkUserToken();
      setLoading(false);
      setAuthorized(isValidUser);
      setType("user");
    };

    checkSession();
  }, [setAuthorized, setLoading, setType]);

  return { isLoading, isAuthorized };
};
