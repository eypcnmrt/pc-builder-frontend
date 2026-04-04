import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { setNavigate } from "./utils/navigation";
import { registerToast, useToast } from "./components/Toast";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const BuildWizard = lazy(() => import("./pages/Build/BuildWizard"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const RouterCore = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    setNavigate(navigate);
    registerToast(addToast);
  }, [navigate, addToast]);

  return (
    <Suspense fallback={<Layout><PageLoader /></Layout>}>
      <Routes>
        <Route path="/" element={<Layout><ErrorBoundary><Home /></ErrorBoundary></Layout>} />
        <Route path="/login" element={<Layout><ErrorBoundary><Login /></ErrorBoundary></Layout>} />
        <Route path="/register" element={<Layout><ErrorBoundary><Register /></ErrorBoundary></Layout>} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <PrivateRoute>
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/build"
          element={
            <Layout>
              <PrivateRoute>
                <ErrorBoundary>
                  <BuildWizard />
                </ErrorBoundary>
              </PrivateRoute>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouterCore;
