import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Dashboard,
  ProcessorSelect,
  RamSelect,
  StorageSelect,
  GpuSelect,
  PsuSelect,
  CoolerSelect,
  CaseSelect,
} from "./pages";
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
      <Route path="/" element={<Home />} />
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
      <Route
        path="/build/ram"
        element={
          <PrivateRoute>
            <RamSelect />
          </PrivateRoute>
        }
      />
      <Route
        path="/build/storage"
        element={
          <PrivateRoute>
            <StorageSelect />
          </PrivateRoute>
        }
      />
      <Route
        path="/build/gpu"
        element={
          <PrivateRoute>
            <GpuSelect />
          </PrivateRoute>
        }
      />
      <Route
        path="/build/psu"
        element={
          <PrivateRoute>
            <PsuSelect />
          </PrivateRoute>
        }
      />
      <Route
        path="/build/cooler"
        element={
          <PrivateRoute>
            <CoolerSelect />
          </PrivateRoute>
        }
      />
      <Route
        path="/build/case"
        element={
          <PrivateRoute>
            <CaseSelect />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
