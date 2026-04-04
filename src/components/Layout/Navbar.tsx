import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, getUser, clearSession } from "../../utils/token";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = getToken();
  const user = getUser();

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-lg font-bold text-slate-900">
          PC Builder
        </NavLink>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/build"
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"}`
                }
              >
                Build
              </NavLink>
              <div className="relative">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
                >
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                    {user?.username?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  <span>{user?.username ?? "Hesap"}</span>
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-slate-50 rounded-xl"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Giriş Yap
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kayıt Ol
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
