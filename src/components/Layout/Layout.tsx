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
    <div className="min-h-screen flex flex-col relative" style={{ background: "var(--color-bg-base)" }}>
      {/* Background circuit grid */}
      <div
        className="bg-circuit-lines fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.35 }}
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="animate-fade-in-down sticky top-0 z-[100] flex items-center justify-between"
        style={{
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
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, var(--color-cyan) 30%, var(--color-cyan-bright) 50%, var(--color-cyan) 70%, transparent 100%)",
            opacity: 0.6,
          }}
        />

        {/* ── Brand ── */}
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <div>
            <div
              className="font-display text-[1.1rem] font-bold tracking-[0.08em] leading-none"
              style={{ color: "var(--color-text-bright)" }}
            >
              PC<span style={{ color: "var(--color-cyan)" }}>BUILD</span>ER
            </div>
            <div
              className="font-mono text-[0.5rem] tracking-[0.2em] uppercase"
              style={{ color: "var(--color-text-dim)" }}
            >
              Configurator
            </div>
          </div>

          {/* version chip */}
          <div
            className="font-mono text-[0.52rem] tracking-[0.1em]"
            style={{
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
          className="flex items-center absolute"
          style={{
            gap: "20px",
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
              className="font-mono flex items-center text-[0.58rem] tracking-[0.1em]"
              style={{ gap: "5px", color: "var(--color-text-dim)" }}
            >
              <div
                className="w-[5px] h-[5px] rounded-full"
                style={{
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
      <main className="flex-1 relative z-[1]" style={{ padding: "2rem 1.5rem" }}>
        {children}
      </main>

      {/* ── Footer bar ───────────────────────────────────────────────────────── */}
      <footer
        className="relative z-[1] flex items-center justify-between"
        style={{
          borderTop: "1px solid var(--color-border-dim)",
          padding: "8px 1.5rem",
          background: "rgba(8,12,16,0.8)",
        }}
      >
        <span
          className="font-mono text-[0.55rem] tracking-[0.1em]"
          style={{ color: "var(--color-text-dim)" }}
        >
          PCBUILDER © 2024 · HARDWARE CONFIGURATOR PLATFORM
        </span>
        <div className="flex gap-4">
          {["SYS:OK", "NET:CONNECTED", "DB:ONLINE"].map((s) => (
            <span
              key={s}
              className="font-mono text-[0.52rem] tracking-[0.08em]"
              style={{ color: "var(--color-text-dim)" }}
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
