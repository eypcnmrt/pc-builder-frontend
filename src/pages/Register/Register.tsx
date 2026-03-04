import React from "react";
import { Link } from "react-router-dom";
import {
  faSpinner,
  faTriangleExclamation,
  faUser,
  faEnvelope,
  faLock,
  faShieldHalved,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRegister from "../../hooks/useRegister";

/* ─── Logo mark (shared aesthetic) ────────────────────────────────────────── */
const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="4" fill="#0d1117" />
    <rect x="0.5" y="0.5" width="35" height="35" rx="3.5" stroke="#06b6d4" strokeOpacity="0.6" />
    <path d="M6 18H14M22 18H30" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M18 6V14M18 22V30" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M10 10H14V14H10V10Z" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
    <path d="M22 10H26V14H22V10Z" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
    <path d="M10 22H14V26H10V22Z" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
    <rect x="15" y="15" width="6" height="6" fill="#06b6d4" fillOpacity="0.9" rx="1" />
  </svg>
);

/* ─── Geometric background ─────────────────────────────────────────────────── */
const GeoBg = () => (
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
    <div style={{ position: "absolute", inset: 0, background: "var(--color-bg-deep)" }} />

    <div className="bg-circuit-lines" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

    {/* Diagonal slash from opposite side */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "40%",
        width: "1px",
        height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.15) 30%, rgba(245,158,11,0.08) 70%, transparent)",
        transform: "rotate(-12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "37%",
        width: "1px",
        height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.06) 40%, transparent)",
        transform: "rotate(-12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />

    {/* Glow orbs */}
    <div
      style={{
        position: "absolute",
        top: "-5%",
        left: "5%",
        width: "380px",
        height: "380px",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 65%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "0",
        right: "-5%",
        width: "320px",
        height: "320px",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 65%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }}
    />

    {/* Left-side decorative text */}
    <div
      className="font-display"
      style={{
        position: "absolute",
        left: "-20px",
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        fontSize: "0.6rem",
        letterSpacing: "0.3em",
        color: "rgba(245,158,11,0.12)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      REGISTER · NEW ACCOUNT · USER INIT · SEQUENCE
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
        color: "rgba(245,158,11,0.18)",
        display: "flex",
        justifyContent: "space-between",
        letterSpacing: "0.08em",
        userSelect: "none",
      }}
    >
      <span>SYS:READY</span>
      <span>REGISTER_MODULE::LOADED</span>
      <span>BUILD.2024.03</span>
    </div>
  </div>
);

/* ─── Chip label ───────────────────────────────────────────────────────────── */
const ChipLabel = ({ label, amber }: { label: string; amber?: boolean }) => (
  <span
    className="font-mono"
    style={{
      display: "inline-block",
      fontSize: "0.6rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: amber ? "var(--color-amber)" : "var(--color-cyan)",
      background: amber ? "rgba(245,158,11,0.06)" : "rgba(6,182,212,0.06)",
      border: `1px solid ${amber ? "rgba(245,158,11,0.2)" : "rgba(6,182,212,0.2)"}`,
      padding: "2px 8px",
    }}
  >
    {label}
  </span>
);

/* ─── Form field helper ────────────────────────────────────────────────────── */
type FieldProps = {
  label: string;
  icon: typeof faUser;
  type: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (v: string) => void;
  delay: string;
  amber?: boolean;
};

const Field = ({ label, icon, type, value, placeholder, error, onChange, delay, amber }: FieldProps) => (
  <div className="animate-fade-in-up" style={{ animationDelay: delay }}>
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
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: "0.6rem", color: amber ? "var(--color-amber)" : "var(--color-cyan)" }}
      />
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="hx-input"
      style={{
        borderRadius: "2px",
        fontFamily: type === "password" ? "var(--font-mono)" : "var(--font-body)",
        borderColor: amber ? "var(--color-border-mid)" : undefined,
      }}
    />
    {error && (
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
        {error}
      </p>
    )}
  </div>
);

/* ─── Register Page ────────────────────────────────────────────────────────── */
const Register = () => {
  const { formData, errors, serverError, isLoading, onChangeFormData, handleSubmit } =
    useRegister();

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
      <div className="scanline" />

      <div
        className="animate-fade-in-up"
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "460px" }}
      >
        {/* ── Brand header ── */}
        <div
          className="animate-fade-in-down"
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "2rem", paddingLeft: "2px" }}
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
          <ChipLabel label="INIT · NEW USER ACCOUNT" amber />
        </div>

        {/* ── Panel ── */}
        <div
          className="panel corner-brackets animate-fade-in-up stagger-2"
          style={{
            padding: "2rem",
            borderRadius: "2px",
            borderTop: "1px solid rgba(245,158,11,0.35)",
            position: "relative",
          }}
        >
          {/* top amber glow line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)",
            }}
          />

          {/* Panel header */}
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
              Hesap Oluştur
            </h2>
            <div
              className="font-mono"
              style={{
                fontSize: "0.58rem",
                color: "var(--color-amber)",
                letterSpacing: "0.15em",
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.25)",
                padding: "3px 8px",
              }}
            >
              NEW USER
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

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

            <Field
              label="Kullanıcı Adı"
              icon={faUser}
              type="text"
              value={formData.username}
              placeholder="kullaniciadi"
              error={errors.username}
              onChange={(v) => onChangeFormData("username", v)}
              delay="0.12s"
            />

            <Field
              label="E-Posta"
              icon={faEnvelope}
              type="email"
              value={formData.email}
              placeholder="ornek@email.com"
              error={errors.email}
              onChange={(v) => onChangeFormData("email", v)}
              delay="0.17s"
            />

            {/* Side-by-side password fields on wider viewports */}
            <div
              className="animate-fade-in-up"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                animationDelay: "0.22s",
              }}
            >
              <div>
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
                  Şifre
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
                  <p className="font-mono" style={{ color: "#f87171", fontSize: "0.6rem", marginTop: "5px" }}>
                    ! {errors.password}
                  </p>
                )}
              </div>

              <div>
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
                  <FontAwesomeIcon icon={faShieldHalved} style={{ fontSize: "0.6rem", color: "var(--color-amber)" }} />
                  Tekrar
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => onChangeFormData("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className="hx-input"
                  style={{ borderRadius: "2px", fontFamily: "var(--font-mono)" }}
                />
                {errors.confirmPassword && (
                  <p className="font-mono" style={{ color: "#f87171", fontSize: "0.6rem", marginTop: "5px" }}>
                    ! {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s", paddingTop: "4px" }}>
              <button
                type="submit"
                disabled={isLoading}
                className="hx-btn-primary"
                style={{
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: isLoading
                    ? undefined
                    : "linear-gradient(135deg, #451a03 0%, #b45309 50%, #f59e0b 100%)",
                  borderColor: "var(--color-amber-mid)",
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 20px rgba(245,158,11,0.35), 0 0 60px rgba(245,158,11,0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" />
                    <span>HESAP OLUŞTURULUYOR...</span>
                  </>
                ) : (
                  <>
                    <span>KAYIT OL</span>
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem" }} />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Divider */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem 0 1.25rem" }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--color-border-dim)" }} />
            <span className="font-mono" style={{ fontSize: "0.58rem", color: "var(--color-text-dim)", letterSpacing: "0.1em" }}>
              MEVCUT KULLANICI
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border-dim)" }} />
          </div>

          <p
            className="font-body"
            style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--color-text-muted)", margin: 0 }}
          >
            Zaten hesabınız var mı?{" "}
            <Link
              to="/login"
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
              Giriş Yap
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

export default Register;
