import React from "react";
import { Login } from "../apps/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../apps/Home";
import PublicComponentRoute from "./ProtectRoute/PublicComponentRoute";
import ProtectUser from "./ProtectRoute/ProtectUser";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicComponentRoute />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/home" element={<ProtectUser />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
