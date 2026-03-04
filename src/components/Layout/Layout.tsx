import React from "react";
import type { PropsWithChildren } from "react";
import UserCard from "../UserCard/UserCard";

/* ─── Logo mark ─────────────────────────────────────────────────────────────── */
const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="4" fill="#0d1117" />
    <rect x="0.5" y="0.5" width="35" height="35" rx="3.5" stroke="#06b6d4" strokeOpacity="0.7" />
    <path d="M6 18H14M22 18H30" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M18 6V14M18 22V30" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M10 10H14V14H10V10Z" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
    <path d="M22 10H26V14H22V10Z" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
    <path d="M10 22H14V26H10V22Z" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
    <rect x="15" y="15" width="6" height="6" fill="#06b6d4" fillOpacity="0.9" rx="1" />
  </svg>
);

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-base)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Background circuit grid */}
      <div
        className="bg-circuit-lines"
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="animate-fade-in-down"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          height: "56px",
          background: "rgba(8,12,16,0.92)",
          borderBottom: "1px solid var(--color-border-dim)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, var(--color-cyan) 30%, var(--color-cyan-bright) 50%, var(--color-cyan) 70%, transparent 100%)",
            opacity: 0.6,
          }}
        />

        {/* ── Brand ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <LogoMark />
          <div>
            <div
              className="font-display"
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                lineHeight: 1,
                color: "var(--color-text-bright)",
              }}
            >
              PC<span style={{ color: "var(--color-cyan)" }}>BUILD</span>ER
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                color: "var(--color-text-dim)",
                textTransform: "uppercase",
              }}
            >
              Configurator
            </div>
          </div>

          {/* version chip */}
          <div
            className="font-mono"
            style={{
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              color: "var(--color-text-dim)",
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-dim)",
              padding: "2px 6px",
              alignSelf: "flex-end",
              marginBottom: "1px",
            }}
          >
            v2.4
          </div>
        </div>

        {/* ── Nav middle (decorative status indicators) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {[
            { label: "CPU", status: "ONLINE" },
            { label: "GPU", status: "ONLINE" },
            { label: "SYS", status: "READY" },
          ].map((item) => (
            <div
              key={item.label}
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                color: "var(--color-text-dim)",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--color-success)",
                  boxShadow: "0 0 5px rgba(16,185,129,0.8)",
                }}
              />
              {item.label}
              <span style={{ color: "var(--color-success)", opacity: 0.7 }}>{item.status}</span>
            </div>
          ))}
        </div>

        {/* ── Right: User Card ── */}
        <UserCard />
      </header>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          padding: "2rem 1.5rem",
        }}
      >
        {children}
      </main>

      {/* ── Footer bar ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid var(--color-border-dim)",
          padding: "8px 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(8,12,16,0.8)",
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: "0.55rem", color: "var(--color-text-dim)", letterSpacing: "0.1em" }}
        >
          PCBUILDER © 2024 · HARDWARE CONFIGURATOR PLATFORM
        </span>
        <div style={{ display: "flex", gap: "16px" }}>
          {["SYS:OK", "NET:CONNECTED", "DB:ONLINE"].map((s) => (
            <span
              key={s}
              className="font-mono"
              style={{ fontSize: "0.52rem", color: "var(--color-text-dim)", letterSpacing: "0.08em" }}
            >
              {s}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
