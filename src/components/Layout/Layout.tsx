import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorBoundary from "../ErrorBoundary";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <Navbar />
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
      <ErrorBoundary>{children}</ErrorBoundary>
    </main>
    <Footer />
  </div>
);

export default Layout;
