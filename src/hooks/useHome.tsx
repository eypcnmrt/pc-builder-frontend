import { useState } from "react";
import { getToken, clearSession } from "../utils/token";

const useHome = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());

  const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, handleLogout };
};

export default useHome;
