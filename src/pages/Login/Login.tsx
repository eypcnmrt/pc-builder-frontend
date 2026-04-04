import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { formData, errors, serverError, isLoading, onChange, handleSubmit } = useLogin();

  return (
    <>
      <Helmet>
        <title>Giriş Yap | PC Builder</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Giriş Yap</h1>
            <p className="text-sm text-slate-500 mb-6">Hesabına giriş yap ve build'ine devam et.</p>

            {serverError && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  E-posta
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.email ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                  placeholder="ornek@email.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => onChange("password", e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.password ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>

            <p className="text-sm text-slate-500 text-center mt-5">
              Hesabın yok mu?{" "}
              <Link to="/register" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
