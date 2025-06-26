import reactQueryClient from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

interface ClientLayoutProps {
  children: ReactNode;
}

// TEST

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <HelmetProvider>{children}</HelmetProvider>
    </QueryClientProvider>
  );
};

export default ClientLayout;
