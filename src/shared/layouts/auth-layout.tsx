"use client";

import { useAuthStore } from "@/entites/model/user/user-auth/use-auth-store";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthLayout: React.FC<{
  allowedRoles: string[];
  children: React.ReactNode;
}> = ({ allowedRoles, children }) => {
  const { isAuthorized, type, isLoading, loadToken } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await loadToken();
      if (!isValid || !allowedRoles.includes(type)) {
        const loginPath = allowedRoles.includes("admin")
          ? "/"
          : "/manager/login";
        navigate(loginPath, { state: { from: location }, replace: true });
      }
    };

    checkAuth();
  }, [allowedRoles, type, loadToken, navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized || !allowedRoles.includes(type)) {
    return null;
  }

  return <>{children}</>;
};
