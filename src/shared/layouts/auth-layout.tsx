import { useAuthStore } from "@/entites/model/user/user-auth/use-auth-store";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "../ui/spinner/spinner";

export const AuthLayout: React.FC<{
  allowedRoles: string[];
  children: React.ReactNode;
}> = ({ allowedRoles, children }) => {
  const { isAuthorized, type, isLoading, loadToken } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      await loadToken(); // Ensure the token and user type are updated
    };

    checkAuth();
  }, [loadToken]);

  useEffect(() => {
    if (!isLoading) {
      console.log("Auth Check Debug:", {
        isAuthorized,
        type,
        allowedRoles,
      });

      if (!isAuthorized) {
        console.log("User is not authorized, redirecting to login.");
        navigate("/login", { state: { from: location }, replace: true });
      } else if (!allowedRoles.includes(type)) {
        console.log(`Access denied for role: ${type}`);
        navigate("/login", { state: { from: location }, replace: true });
      }
    }
  }, [allowedRoles, type, isAuthorized, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner size={80} color="#00A859" />
      </div>
    );
  }

  if (!isAuthorized || !allowedRoles.includes(type)) {
    return null;
  }

  return <>{children}</>;
};
