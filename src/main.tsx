import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page.tsx";
import { LoginPage } from "./pages/login-page/login-page.tsx";
import { HousesCataloguePage } from "./pages/houses-catalogue-page/houses-catalogue-page.tsx";
import { AddObjectPage } from "./pages/add-object-page/add-object-page.tsx";
import { ObjectInnerPage } from "./pages/object-inner-page/object-inner-page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/houses-catalogue" element={<HousesCataloguePage />} />
        <Route path="/houses-catalogue/:id" element={<ObjectInnerPage />} />
        <Route path="/add-object" element={<AddObjectPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
