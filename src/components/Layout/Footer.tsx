import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 px-4 py-6 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} PC Builder. Tüm hakları saklıdır.
      </p>
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">
          Ana Sayfa
        </Link>
        <Link to="/login" className="text-sm text-slate-500 hover:text-slate-900">
          Giriş Yap
        </Link>
        <Link to="/register" className="text-sm text-slate-500 hover:text-slate-900">
          Kayıt Ol
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
