import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const authToken = null;
  return authToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
