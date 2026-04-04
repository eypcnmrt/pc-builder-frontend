import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearSession } from "../utils/token";

export const useHome = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken());

  const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
  };

  const goToBuild = () => navigate("/build");
  const goToDashboard = () => navigate("/dashboard");

  return { isAuthenticated, handleLogout, goToBuild, goToDashboard };
};
