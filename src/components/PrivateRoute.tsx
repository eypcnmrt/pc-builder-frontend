import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return getToken() ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
