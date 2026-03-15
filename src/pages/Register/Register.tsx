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
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-[var(--color-bg-deep)]" />

    <div className="bg-circuit-lines absolute inset-0 opacity-60" />

    {/* Diagonal slash from opposite side */}
    <div
      className="absolute top-0 h-full w-px"
      style={{
        left: "40%",
        background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.15) 30%, rgba(245,158,11,0.08) 70%, transparent)",
        transform: "rotate(-12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />
    <div
      className="absolute top-0 h-full w-px"
      style={{
        left: "37%",
        background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.06) 40%, transparent)",
        transform: "rotate(-12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />

    {/* Glow orbs */}
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        top: "-5%",
        left: "5%",
        width: "380px",
        height: "380px",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 65%)",
      }}
    />
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        bottom: "0",
        right: "-5%",
        width: "320px",
        height: "320px",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 65%)",
      }}
    />

    {/* Left-side decorative text */}
    <div
      className="font-display absolute text-[0.6rem] tracking-[0.3em] uppercase whitespace-nowrap select-none text-[rgba(245,158,11,0.12)]"
      style={{
        left: "-20px",
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
      }}
    >
      REGISTER · NEW ACCOUNT · USER INIT · SEQUENCE
    </div>

    {/* Bottom status bar */}
    <div className="font-mono absolute text-[0.6rem] flex justify-between tracking-[0.08em] select-none text-[rgba(245,158,11,0.18)] bottom-4 left-6 right-6">
      <span>SYS:READY</span>
      <span>REGISTER_MODULE::LOADED</span>
      <span>BUILD.2024.03</span>
    </div>
  </div>
);

/* ─── Chip label ───────────────────────────────────────────────────────────── */
const ChipLabel = ({ label, amber }: { label: string; amber?: boolean }) => (
  <span
    className={`font-mono inline-block text-[0.6rem] tracking-[0.15em] uppercase py-0.5 px-2 ${
      amber
        ? "text-[var(--color-amber)] bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.2)]"
        : "text-[var(--color-cyan)] bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.2)]"
    }`}
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
    <label className="font-mono flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase mb-2 text-[var(--color-text-muted)]">
      <FontAwesomeIcon
        icon={icon}
        className={`text-[0.6rem] ${amber ? "text-[var(--color-amber)]" : "text-[var(--color-cyan)]"}`}
      />
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="hx-input rounded-sm"
      style={{
        fontFamily: type === "password" ? "var(--font-mono)" : "var(--font-body)",
        borderColor: amber ? "var(--color-border-mid)" : undefined,
      }}
    />
    {error && (
      <p className="font-mono text-[0.65rem] mt-[5px] tracking-[0.05em] text-red-400">
        <span className="text-[var(--color-error)]">! </span>
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
    <div className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
      <GeoBg />
      <div className="scanline" />

      <div className="animate-fade-in-up relative z-[1] w-full max-w-[460px]">
        {/* ── Brand header ── */}
        <div className="animate-fade-in-down flex flex-col items-start mb-8 pl-0.5">
          <div className="flex items-center gap-3 mb-[10px]">
            <LogoMark />
            <div>
              <div className="font-display text-[1.6rem] font-bold tracking-[0.06em] leading-none text-[var(--color-text-bright)]">
                PC<span className="text-[var(--color-cyan)]">BUILD</span>ER
              </div>
              <div className="font-mono text-[0.55rem] tracking-[0.25em] uppercase mt-0.5 text-[var(--color-text-dim)]">
                Hardware Configurator
              </div>
            </div>
          </div>
          <ChipLabel label="INIT · NEW USER ACCOUNT" amber />
        </div>

        {/* ── Panel ── */}
        <div
          className="panel corner-brackets animate-fade-in-up stagger-2 p-8 rounded-sm relative border-t border-t-[rgba(245,158,11,0.35)]"
        >
          {/* top amber glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,158,11,0.6),transparent)]" />

          {/* Panel header */}
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-display text-[1.3rem] font-semibold tracking-[0.08em] uppercase m-0 text-[var(--color-text-bright)]">
              Hesap Oluştur
            </h2>
            <div className="font-mono text-[0.58rem] tracking-[0.15em] py-[3px] px-2 text-[var(--color-amber)] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)]">
              NEW USER
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[1.1rem]">

            {/* Server error */}
            {serverError && (
              <div className="animate-fade-in font-body flex items-center gap-2 py-3 px-4 text-[0.82rem] bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.3)] border-l-[3px] border-l-[var(--color-error)] text-red-300">
                <FontAwesomeIcon icon={faTriangleExclamation} className="shrink-0 text-[var(--color-error)]" />
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
              className="animate-fade-in-up grid grid-cols-2 gap-4"
              style={{ animationDelay: "0.22s" }}
            >
              <div>
                <label className="font-mono flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase mb-2 text-[var(--color-text-muted)]">
                  <FontAwesomeIcon icon={faLock} className="text-[0.6rem] text-[var(--color-cyan)]" />
                  Şifre
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => onChangeFormData("password", e.target.value)}
                  placeholder="••••••••"
                  className="hx-input rounded-sm font-mono"
                />
                {errors.password && (
                  <p className="font-mono text-[0.6rem] mt-[5px] text-red-400">
                    ! {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="font-mono flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase mb-2 text-[var(--color-text-muted)]">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-[0.6rem] text-[var(--color-amber)]" />
                  Tekrar
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => onChangeFormData("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className="hx-input rounded-sm font-mono"
                />
                {errors.confirmPassword && (
                  <p className="font-mono text-[0.6rem] mt-[5px] text-red-400">
                    ! {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="animate-fade-in-up pt-1" style={{ animationDelay: "0.3s" }}>
              <button
                type="submit"
                disabled={isLoading}
                className="hx-btn-primary rounded-sm flex items-center justify-center gap-2.5 border-[var(--color-amber-mid)] shadow-none"
                style={{
                  background: isLoading
                    ? undefined
                    : "linear-gradient(135deg, #451a03 0%, #b45309 50%, #f59e0b 100%)",
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
                    <FontAwesomeIcon icon={faArrowRight} className="text-[0.8rem]" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[var(--color-border-dim)]" />
            <span className="font-mono text-[0.58rem] tracking-[0.1em] text-[var(--color-text-dim)]">
              MEVCUT KULLANICI
            </span>
            <div className="flex-1 h-px bg-[var(--color-border-dim)]" />
          </div>

          <p className="font-body text-center text-[0.82rem] m-0 text-[var(--color-text-muted)]">
            Zaten hesabınız var mı?{" "}
            <Link
              to="/login"
              className="font-semibold no-underline tracking-[0.04em] transition-all duration-200 text-[var(--color-cyan)] hover:text-[var(--color-cyan-bright)] hover:[text-shadow:0_0_12px_rgba(6,182,212,0.5)]"
            >
              Giriş Yap
            </Link>
          </p>
        </div>

        {/* Bottom meta */}
        <div className="font-mono animate-fade-in stagger-8 flex justify-between mt-4 text-[0.55rem] tracking-[0.1em] text-[var(--color-text-dim)] px-0.5">
          <span>PCBUILDER © 2024</span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
