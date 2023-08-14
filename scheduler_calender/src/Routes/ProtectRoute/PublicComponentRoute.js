import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicComponentRoute() {
  const user = sessionStorage.getItem("email");
  return <div>{user != null ? <Navigate to={"/home"} /> : <Outlet />}</div>;
}
