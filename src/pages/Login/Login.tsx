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
    className="absolute inset-0 overflow-hidden z-0"
  >
    {/* base deep bg */}
    <div className="absolute inset-0 bg-[var(--color-bg-deep)]" />

    {/* animated circuit grid */}
    <div className="bg-circuit-lines absolute inset-0 opacity-60" />

    {/* diagonal accent slash */}
    <div
      className="absolute top-0 h-full w-px"
      style={{
        left: "55%",
        background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.25) 30%, rgba(6,182,212,0.12) 70%, transparent)",
        transform: "rotate(12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />
    <div
      className="absolute top-0 h-full w-px"
      style={{
        left: "58%",
        background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.08) 40%, transparent)",
        transform: "rotate(12deg) translateX(-50%)",
        transformOrigin: "top",
      }}
    />

    {/* Large glow orbs */}
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        top: "-10%",
        right: "10%",
        width: "420px",
        height: "420px",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 65%)",
      }}
    />
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        bottom: "-5%",
        left: "-5%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 65%)",
      }}
    />

    {/* Right-side decorative text */}
    <div
      className="font-display absolute text-[0.6rem] tracking-[0.3em] uppercase whitespace-nowrap select-none text-[rgba(6,182,212,0.15)]"
      style={{
        right: "-20px",
        top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
      }}
    >
      HARDWARE · CONFIGURATOR · SYSTEM BUILD · v2.4
    </div>

    {/* Bottom status bar */}
    <div
      className="font-mono absolute text-[0.6rem] flex justify-between tracking-[0.08em] select-none text-[rgba(6,182,212,0.2)] bottom-4 left-6 right-6"
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
    className="font-mono inline-block text-[0.6rem] tracking-[0.15em] uppercase py-0.5 px-2 text-[var(--color-cyan)] bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.2)]"
  >
    {label}
  </span>
);

/* ─── Login Page ───────────────────────────────────────────────────────────── */
const Login = () => {
  const { formData, errors, serverError, isLoading, onChangeFormData, handleSubmit } =
    useLogin();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
      <GeoBg />

      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Form container */}
      <div className="animate-fade-in-up relative z-[1] w-full max-w-[440px]">
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
          <ChipLabel label="AUTH · SIGN IN" />
        </div>

        {/* ── Panel ── */}
        <div className="panel corner-brackets accent-top animate-fade-in-up stagger-2 p-8 rounded-sm">
          {/* Panel header row */}
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-display text-[1.3rem] font-semibold tracking-[0.08em] uppercase m-0 text-[var(--color-text-bright)]">
              Oturum Aç
            </h2>
            <div className="font-mono text-[0.58rem] tracking-[0.15em] py-[3px] px-2 text-[var(--color-cyan)] bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)]">
              SECURE
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Server error */}
            {serverError && (
              <div className="animate-fade-in font-body flex items-center gap-2 py-3 px-4 text-[0.82rem] bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.3)] border-l-[3px] border-l-[var(--color-error)] text-red-300">
                <FontAwesomeIcon icon={faTriangleExclamation} className="shrink-0 text-[var(--color-error)]" />
                {serverError}
              </div>
            )}

            {/* Email field */}
            <div className="animate-fade-in-up stagger-3">
              <label className="font-mono flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase mb-2 text-[var(--color-text-muted)]">
                <FontAwesomeIcon icon={faUser} className="text-[0.6rem] text-[var(--color-cyan)]" />
                E-POSTA
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onChangeFormData("email", e.target.value)}
                  placeholder="ornek@email.com"
                  className="hx-input rounded-sm"
                />
                {/* focus accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 pointer-events-none transition-all duration-200 bg-[linear-gradient(90deg,var(--color-cyan),var(--color-cyan-bright),var(--color-cyan))]"
                />
              </div>
              {errors.email && (
                <p className="font-mono flex items-center gap-1 text-[0.65rem] mt-[5px] tracking-[0.05em] text-red-400">
                  <span className="text-[var(--color-error)]">!</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="animate-fade-in-up stagger-4">
              <label className="font-mono flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase mb-2 text-[var(--color-text-muted)]">
                <FontAwesomeIcon icon={faLock} className="text-[0.6rem] text-[var(--color-cyan)]" />
                ŞİFRE
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => onChangeFormData("password", e.target.value)}
                placeholder="••••••••"
                className="hx-input font-mono rounded-sm"
              />
              {errors.password && (
                <p className="font-mono text-[0.65rem] mt-[5px] tracking-[0.05em] text-red-400">
                  <span className="text-[var(--color-error)]">! </span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="animate-fade-in-up stagger-5 pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="hx-btn-primary rounded-sm flex items-center justify-center gap-2.5"
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" />
                    <span>KİMLİK DOĞRULANMAKTADIR...</span>
                  </>
                ) : (
                  <>
                    <span>GİRİŞ YAP</span>
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
              YENİ KULLANICI
            </span>
            <div className="flex-1 h-px bg-[var(--color-border-dim)]" />
          </div>

          <p className="font-body text-center text-[0.82rem] m-0 text-[var(--color-text-muted)]">
            Hesabınız yok mu?{" "}
            <Link
              to="/register"
              className="font-semibold no-underline tracking-[0.04em] transition-all duration-200 text-[var(--color-cyan)] hover:text-[var(--color-cyan-bright)] hover:[text-shadow:0_0_12px_rgba(6,182,212,0.5)]"
            >
              Kayıt Ol
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

export default Login;
