import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login, Register, Dashboard, ProcessorSelect } from "./pages";
import { getToken } from "./utils/token";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return getToken() ? <>{children}</> : <Navigate to="/login" replace />;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/build/building"
        element={
          <PrivateRoute>
            <ProcessorSelect />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Router;
