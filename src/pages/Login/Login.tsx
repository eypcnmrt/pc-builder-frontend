import React from "react";
import { Link } from "react-router-dom";
import { faSpinner, faTriangleExclamation, faUser, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLogin from "../../hooks/useLogin";

/* ─── Inline SVG: circuit-board logo mark ─────────────────────────────────── */
const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="4" fill="#0d1117" />
    <rect x="0.5" y="0.5" width="35" height="35" rx="3.5" stroke="#06b6d4" strokeOpacity="0.6" />
    {/* circuit traces */}
    <path d="M6 18H14M22 18H30" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M18 6V14M18 22V30" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M10 10H14V14H10V10Z" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
    <path d="M22 10H26V14H22V10Z" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
    <path d="M10 22H14V26H10V22Z" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
    <rect x="15" y="15" width="6" height="6" fill="#06b6d4" fillOpacity="0.9" rx="1" />
  </svg>
);

/* ─── Geometric background panel ──────────────────────────────────────────── */
const GeoBg = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      zIndex: 0,
    }}
  >
    {/* base deep bg */}
    <div style={{ position: "absolute", inset: 0, background: "var(--color-bg-deep)" }} />

    {/* animated circuit grid */}
    <div
      className="bg-circuit-lines"
      style={{ position: "absolute", inset: 0, opacity: 0.6 }}
    />

    {/* diagonal accent slash */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "55%",
        width: "1px",
        height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.25) 30%, rgba(6,182,212,0.12) 70%, transparent)",
        transform: "rotate(12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "58%",
        width: "1px",
        height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.08) 40%, transparent)",
        transform: "rotate(12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />

    {/* Large glow orbs */}
    <div
      style={{
        position: "absolute",
        top: "-10%",
        right: "10%",
        width: "420px",
        height: "420px",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 65%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "-5%",
        left: "-5%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 65%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }}
    />

    {/* Right-side decorative text */}
    <div
      className="font-display"
      style={{
        position: "absolute",
        right: "-20px",
        top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
        fontSize: "0.6rem",
        letterSpacing: "0.3em",
        color: "rgba(6,182,212,0.15)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      HARDWARE · CONFIGURATOR · SYSTEM BUILD · v2.4
    </div>

    {/* Bottom status bar */}
    <div
      className="font-mono"
      style={{
        position: "absolute",
        bottom: "16px",
        left: "24px",
        right: "24px",
        fontSize: "0.6rem",
        color: "rgba(6,182,212,0.2)",
        display: "flex",
        justifyContent: "space-between",
        letterSpacing: "0.08em",
        userSelect: "none",
      }}
    >
      <span>SYS:READY</span>
      <span>AUTH_MODULE::LOADED</span>
      <span>BUILD.2024.03</span>
    </div>
  </div>
);

/* ─── Component label chip ─────────────────────────────────────────────────── */
const ChipLabel = ({ label }: { label: string }) => (
  <span
    className="font-mono"
    style={{
      display: "inline-block",
      fontSize: "0.6rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "var(--color-cyan)",
      background: "rgba(6,182,212,0.06)",
      border: "1px solid rgba(6,182,212,0.2)",
      padding: "2px 8px",
    }}
  >
    {label}
  </span>
);

/* ─── Login Page ───────────────────────────────────────────────────────────── */
const Login = () => {
  const { formData, errors, serverError, isLoading, onChangeFormData, handleSubmit } =
    useLogin();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        overflow: "hidden",
      }}
    >
      <GeoBg />

      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Form container */}
      <div
        className="animate-fade-in-up"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "440px",
        }}
      >
        {/* ── Brand header ── */}
        <div
          className="animate-fade-in-down"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "2rem",
            paddingLeft: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <LogoMark />
            <div>
              <div
                className="font-display"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                  color: "var(--color-text-bright)",
                }}
              >
                PC<span style={{ color: "var(--color-cyan)" }}>BUILD</span>ER
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                  color: "var(--color-text-dim)",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Hardware Configurator
              </div>
            </div>
          </div>
          <ChipLabel label="AUTH · SIGN IN" />
        </div>

        {/* ── Panel ── */}
        <div
          className="panel corner-brackets accent-top animate-fade-in-up stagger-2"
          style={{
            padding: "2rem",
            borderRadius: "2px",
          }}
        >
          {/* Panel header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.75rem",
            }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: "1.3rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "var(--color-text-bright)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Oturum Aç
            </h2>
            <div
              className="font-mono"
              style={{
                fontSize: "0.58rem",
                color: "var(--color-cyan)",
                letterSpacing: "0.15em",
                background: "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.2)",
                padding: "3px 8px",
              }}
            >
              SECURE
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Server error */}
            {serverError && (
              <div
                className="animate-fade-in font-body"
                style={{
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderLeft: "3px solid var(--color-error)",
                  color: "#fca5a5",
                  padding: "0.75rem 1rem",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "var(--color-error)", flexShrink: 0 }} />
                {serverError}
              </div>
            )}

            {/* Email field */}
            <div className="animate-fade-in-up stagger-3">
              <label
                className="font-mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "8px",
                }}
              >
                <FontAwesomeIcon icon={faUser} style={{ fontSize: "0.6rem", color: "var(--color-cyan)" }} />
                E-POSTA
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onChangeFormData("email", e.target.value)}
                  placeholder="ornek@email.com"
                  className="hx-input"
                  style={{ borderRadius: "2px" }}
                />
                {/* focus accent line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, var(--color-cyan), var(--color-cyan-bright), var(--color-cyan))",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    pointerEvents: "none",
                  }}
                />
              </div>
              {errors.email && (
                <p
                  className="font-mono"
                  style={{
                    color: "#f87171",
                    fontSize: "0.65rem",
                    marginTop: "5px",
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ color: "var(--color-error)" }}>!</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="animate-fade-in-up stagger-4">
              <label
                className="font-mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "8px",
                }}
              >
                <FontAwesomeIcon icon={faLock} style={{ fontSize: "0.6rem", color: "var(--color-cyan)" }} />
                ŞİFRE
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => onChangeFormData("password", e.target.value)}
                placeholder="••••••••"
                className="hx-input"
                style={{ borderRadius: "2px", fontFamily: "var(--font-mono)" }}
              />
              {errors.password && (
                <p
                  className="font-mono"
                  style={{
                    color: "#f87171",
                    fontSize: "0.65rem",
                    marginTop: "5px",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span style={{ color: "var(--color-error)" }}>! </span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="animate-fade-in-up stagger-5" style={{ paddingTop: "4px" }}>
              <button
                type="submit"
                disabled={isLoading}
                className="hx-btn-primary"
                style={{ borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" />
                    <span>KİMLİK DOĞRULANMAKTADIR...</span>
                  </>
                ) : (
                  <>
                    <span>GİRİŞ YAP</span>
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem" }} />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "1.5rem 0 1.25rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--color-border-dim)" }} />
            <span
              className="font-mono"
              style={{ fontSize: "0.58rem", color: "var(--color-text-dim)", letterSpacing: "0.1em" }}
            >
              YENİ KULLANICI
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border-dim)" }} />
          </div>

          <p
            className="font-body"
            style={{
              textAlign: "center",
              fontSize: "0.82rem",
              color: "var(--color-text-muted)",
              margin: 0,
            }}
          >
            Hesabınız yok mu?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--color-cyan)",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s, text-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--color-cyan-bright)";
                (e.target as HTMLElement).style.textShadow = "0 0 12px rgba(6,182,212,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "var(--color-cyan)";
                (e.target as HTMLElement).style.textShadow = "none";
              }}
            >
              Kayıt Ol
            </Link>
          </p>
        </div>

        {/* Bottom meta */}
        <div
          className="font-mono animate-fade-in stagger-8"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            fontSize: "0.55rem",
            color: "var(--color-text-dim)",
            letterSpacing: "0.1em",
            padding: "0 2px",
          }}
        >
          <span>PCBUILDER © 2024</span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
