import React from "react";
import { Link } from "react-router-dom";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRegister from "../../hooks/useRegister";

/* ─── GPU / PCB Illustration ─────────────────────────────────────────────── */
const GpuIllustration = () => (
  <svg
    width="260"
    height="180"
    viewBox="0 0 260 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* PCB body */}
    <rect x="10" y="20" width="240" height="130" rx="6" fill="#07090e" stroke="#06b6d4" strokeWidth="1.5" />

    {/* PCIe gold contacts at bottom */}
    {Array.from({ length: 22 }, (_, i) => (
      <rect key={`contact-${i}`} x={20 + i * 10} y={140} width="5" height="14" rx="1"
        fill={i % 3 === 0 ? "rgba(245,158,11,0.6)" : "rgba(6,182,212,0.35)"} />
    ))}

    {/* Heatsink fins on top */}
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={`fin-${i}`} x={50 + i * 14} y={20} width="8" height="28" rx="1"
        fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
    ))}

    {/* GPU die (large chip) */}
    <rect x="80" y="58" width="60" height="60" rx="4" fill="#0a0d14" stroke="#06b6d4" strokeWidth="1.5" />
    <rect x="88" y="66" width="44" height="44" rx="2" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.25)" strokeWidth="1" />
    {/* GPU die grid */}
    <line x1="110" y1="66" x2="110" y2="110" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
    <line x1="88" y1="88" x2="132" y2="88" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
    {/* GPU die center */}
    <rect x="99" y="77" width="22" height="22" rx="2" fill="rgba(6,182,212,0.3)" stroke="#06b6d4" strokeWidth="1" />
    <text x="110" y="92" textAnchor="middle" fill="#06b6d4" fontSize="8" fontFamily="monospace" fontWeight="bold">GPU</text>

    {/* VRAM chips */}
    {[
      [155, 58], [180, 58], [205, 58],
      [155, 88], [180, 88], [205, 88],
    ].map(([x, y]) => (
      <rect key={`vram-${x}-${y}`} x={x} y={y} width="20" height="18" rx="2"
        fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
    ))}
    <text x="193" y="78" textAnchor="middle" fill="rgba(6,182,212,0.4)" fontSize="6" fontFamily="monospace">VRAM</text>

    {/* Power connector */}
    <rect x="18" y="50" width="28" height="16" rx="2" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
    {[22, 28, 34, 40].map((x) => (
      <rect key={`pin-${x}`} x={x} y={53} width="3" height="10" rx="0.5" fill="rgba(245,158,11,0.5)" />
    ))}

    {/* Trace lines */}
    <path d="M60 88 L80 88" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="3 2" />
    <path d="M140 88 L155 88" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="3 2" />
    <path d="M140 67 L155 67" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="3 2" />

    {/* Output ports at right edge */}
    {[38, 56, 74, 92].map((y) => (
      <rect key={`port-${y}`} x={242} y={y} width="8" height="12" rx="1"
        fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
    ))}
    <text x="253" y="74" fill="rgba(6,182,212,0.3)" fontSize="5" fontFamily="monospace"
      transform="rotate(90, 253, 74)">HDMI·DP</text>
  </svg>
);

/* ─── Logo Icon ─────────────────────────────────────────────────────────────── */
const LogoIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="3" y="3" width="12" height="12" rx="1.5" stroke="#0d1117" strokeWidth="1.5" />
    <rect x="6" y="6" width="6" height="6" rx="0.5" fill="#0d1117" />
    {[
      [1, 6, 3, 6], [1, 12, 3, 12],
      [15, 6, 17, 6], [15, 12, 17, 12],
      [6, 1, 6, 3], [12, 1, 12, 3],
      [6, 15, 6, 17], [12, 15, 12, 17],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0d1117" strokeWidth="1.5" strokeLinecap="round" />
    ))}
  </svg>
);

/* ─── Build Components List ─────────────────────────────────────────────────── */
const components = [
  { label: "İşlemci" },
  { label: "Anakart" },
  { label: "Ram" },
  { label: "Depolama" },
  { label: "Ekran Kartı" },
  { label: "Güç Kaynağı" },
  { label: "Soğutucu" },
  { label: "Kasa" },
];

/* ─── Register Page ────────────────────────────────────────────────────────── */
const Register = () => {
  const { formData, errors, serverError, isLoading, onChangeFormData, handleSubmit } =
    useRegister();

  return (
    <div className="min-h-screen flex">

      {/* ── Left Panel ── */}
      <div
        className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "#07090e" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(6,182,212,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Smooth gradient bridge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, transparent, #0c1018)" }}
        />

        {/* Top: Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 bg-[var(--color-cyan)] rounded flex items-center justify-center shrink-0">
              <LogoIcon size={18} />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-[var(--color-text-bright)]">
              PC<span className="text-[var(--color-cyan)]">Builder</span>
            </span>
          </div>
          <p className="font-body text-sm text-[var(--color-text-muted)] ml-[42px]">
            Kendi bilgisayarını tasarla
          </p>
        </div>

        {/* Center: Illustration */}
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <GpuIllustration />
          <div>
            <h2 className="font-display text-2xl font-semibold text-[var(--color-text-bright)] mb-2">
              Aramıza Katıl
            </h2>
            <p className="font-body text-sm text-[var(--color-text-muted)] max-w-[260px] mx-auto leading-relaxed">
              Hesabını oluştur, parçalarını seç ve hayalindeki sistemi kaydet.
            </p>
          </div>
        </div>

        {/* Bottom: Component badges */}
        <div className="relative z-10">
          <p className="font-mono text-[0.62rem] tracking-widest uppercase text-[var(--color-text-dim)] mb-2.5">
            8 Bileşen
          </p>
          <div className="flex flex-wrap gap-1.5">
            {components.map((c, i) => (
              <div
                key={c.label}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(255,255,255,0.03)] border border-[var(--color-border-dim)]"
              >
                <span className="font-mono text-[0.6rem] text-[var(--color-cyan)] font-bold w-3 text-center leading-none">
                  {i + 1}
                </span>
                <span className="font-body text-[0.7rem] text-[var(--color-text-secondary)]">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div
        className="flex-1 lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12"
        style={{ background: "#0c1018" }}
      >

        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-7 h-7 bg-[var(--color-cyan)] rounded flex items-center justify-center">
            <LogoIcon size={15} />
          </div>
          <span className="font-display text-lg font-bold text-[var(--color-text-bright)]">
            PC<span className="text-[var(--color-cyan)]">Builder</span>
          </span>
        </div>

        {/* Form */}
        <div className="w-full max-w-[400px] animate-fade-in-up">

          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold text-[var(--color-text-bright)] mb-1.5">
              Hesap oluştur
            </h1>
            <p className="font-body text-sm text-[var(--color-text-muted)]">
              Birkaç saniyede üye ol ve yapılandırmana başla.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {serverError && (
              <div className="animate-fade-in flex items-center gap-2.5 py-3 px-4 rounded bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.25)] text-red-300 text-sm">
                <FontAwesomeIcon icon={faTriangleExclamation} className="shrink-0 text-[var(--color-error)]" />
                <span className="font-body">{serverError}</span>
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="font-body text-sm font-medium text-[var(--color-text-secondary)]">
                Kullanıcı adı
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => onChangeFormData("username", e.target.value)}
                placeholder="kullaniciadi"
                className="hx-input rounded-md"
                autoComplete="username"
              />
              {errors.username && (
                <p className="font-body text-xs text-red-400">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-body text-sm font-medium text-[var(--color-text-secondary)]">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => onChangeFormData("email", e.target.value)}
                placeholder="ornek@email.com"
                className="hx-input rounded-md"
                autoComplete="email"
              />
              {errors.email && (
                <p className="font-body text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password fields — side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="font-body text-sm font-medium text-[var(--color-text-secondary)]">
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => onChangeFormData("password", e.target.value)}
                  placeholder="••••••••"
                  className="hx-input rounded-md"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="font-body text-xs text-red-400">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPassword" className="font-body text-sm font-medium text-[var(--color-text-secondary)]">
                  Tekrar
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => onChangeFormData("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className="hx-input rounded-md"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="font-body text-xs text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="hx-btn-primary rounded-md flex items-center justify-center gap-2 mt-1"
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" />
                  <span>Hesap oluşturuluyor...</span>
                </>
              ) : (
                <span>Kayıt Ol</span>
              )}
            </button>

          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[var(--color-border-dim)]" />
            <span className="font-body text-xs text-[var(--color-text-dim)]">veya</span>
            <div className="flex-1 h-px bg-[var(--color-border-dim)]" />
          </div>

          <p className="font-body text-sm text-center text-[var(--color-text-muted)]">
            Zaten hesabın var mı?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--color-cyan)] hover:text-[var(--color-cyan-bright)] transition-colors duration-200 no-underline"
            >
              Giriş yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
