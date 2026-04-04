import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRegister } from "../../hooks/useRegister";

const FIELDS = [
  { key: "username" as const, label: "Kullanıcı Adı", type: "text", placeholder: "johndoe", autocomplete: "username" },
  { key: "email" as const, label: "E-posta", type: "email", placeholder: "ornek@email.com", autocomplete: "email" },
  { key: "password" as const, label: "Şifre", type: "password", placeholder: "••••••••", autocomplete: "new-password" },
  { key: "confirmPassword" as const, label: "Şifre Tekrar", type: "password", placeholder: "••••••••", autocomplete: "new-password" },
];

const Register = () => {
  const { formData, errors, serverError, isLoading, onChange, handleSubmit } = useRegister();

  return (
    <>
      <Helmet>
        <title>Hesap Oluştur | PC Builder</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Hesap Oluştur</h1>
            <p className="text-sm text-slate-500 mb-6">Ücretsiz kayıt ol ve build'ini oluşturmaya başla.</p>

            {serverError && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {FIELDS.map(({ key, label, type, placeholder, autocomplete }) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-slate-700 mb-1">
                    {label}
                  </label>
                  <input
                    id={key}
                    type={type}
                    autoComplete={autocomplete}
                    value={formData[key]}
                    onChange={(e) => onChange(key, e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors[key] ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"
                    }`}
                    placeholder={placeholder}
                  />
                  {errors[key] && <p className="text-xs text-red-600 mt-1">{errors[key]}</p>}
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isLoading ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
              </button>
            </form>

            <p className="text-sm text-slate-500 text-center mt-5">
              Zaten hesabın var mı?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
