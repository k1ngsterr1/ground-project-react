import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import { AddObjectPage } from "./pages/add-object-page/add-object-page.tsx";
import { ComparisonPage } from "./pages/comparison-page/comparison-page.tsx";
import { FavoritesPage } from "./pages/favorites-page/favorites-page.tsx";
import { HousesCataloguePage } from "./pages/houses-catalogue-page/houses-catalogue-page.tsx";
import { LoginPage } from "./pages/login-page/login-page.tsx";
import { MainPage } from "./pages/main-page/main-page.tsx";
import { ObjectInnerPage } from "./pages/object-inner-page/object-inner-page.tsx";
import { RegistrationPage } from "./pages/registration-page/registration-page.tsx";
import ClientLayout from "./shared/layouts/client-layout.tsx";
import { GroundCatalogueScreen } from "./widgets/ui/ground-catalogue-screen/ui/ground-catalogue-screen.tsx";
import { AuthLayout } from "./shared/layouts/auth-layout.tsx";
import { UserManagementPage } from "./pages/user-management-page/user-management-page.tsx";
import { SecretObjectScreen } from "./widgets/ui/secret-object-screen/ui/secret-object-screen";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClientLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/houses-catalogue" element={<HousesCataloguePage />} />
          <Route
            path="/user-management"
            element={
              <AuthLayout allowedRoles={["admin"]}>
                <UserManagementPage />
              </AuthLayout>
            }
          />
          <Route path="/ground-catalogue" element={<GroundCatalogueScreen />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route
            path="/houses-catalogue/:id"
            element={<ObjectInnerPage isGround={false} />}
          />{" "}
          <Route
            path="/ground-catalogue/:id"
            element={<ObjectInnerPage isGround={true} />}
          />
          <Route
            path="/add-object"
            element={
              <AuthLayout allowedRoles={["admin", "manager"]}>
                <AddObjectPage />
              </AuthLayout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/secret-object/:id"
            element={<SecretObjectScreen isGround={false} />}
          />
        </Routes>
      </BrowserRouter>
    </ClientLayout>
  </StrictMode>
);
