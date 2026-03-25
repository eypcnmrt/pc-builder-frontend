import React from "react";
import { Link } from "react-router-dom";
import useHome from "../../hooks/useHome";

/* ─── CPU Chip Illustration ─────────────────────────────────────────────────── */
const CpuIllustration = () => (
  <svg
    width="220"
    height="220"
    viewBox="0 0 220 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="110" cy="110" r="100" fill="rgba(6,182,212,0.04)" />
    {[60, 80, 100, 120, 140, 160].map((x) => (
      <rect key={`pt-${x}`} x={x - 2} y={38} width="4" height="22" rx="1" fill="rgba(6,182,212,0.5)" />
    ))}
    {[60, 80, 100, 120, 140, 160].map((x) => (
      <rect key={`pb-${x}`} x={x - 2} y={160} width="4" height="22" rx="1" fill="rgba(6,182,212,0.5)" />
    ))}
    {[70, 90, 110, 130, 150].map((y) => (
      <rect key={`pl-${y}`} x={38} y={y - 2} width="22" height="4" rx="1" fill="rgba(6,182,212,0.5)" />
    ))}
    {[70, 90, 110, 130, 150].map((y) => (
      <rect key={`pr-${y}`} x={160} y={y - 2} width="22" height="4" rx="1" fill="rgba(6,182,212,0.5)" />
    ))}
    <rect x="56" y="56" width="108" height="108" rx="6" fill="#07090e" stroke="#06b6d4" strokeWidth="1.5" />
    <rect x="68" y="68" width="84" height="84" rx="3" fill="#0a0d14" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
    <line x1="96" y1="68" x2="96" y2="152" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
    <line x1="124" y1="68" x2="124" y2="152" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
    <line x1="68" y1="96" x2="152" y2="96" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
    <line x1="68" y1="124" x2="152" y2="124" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
    {[
      [72, 72], [100, 72], [128, 72],
      [72, 100],            [128, 100],
      [72, 128], [100, 128], [128, 128],
    ].map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x} y={y} width="20" height="20" rx="2"
        fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.35)" strokeWidth="1" />
    ))}
    <rect x="98" y="98" width="24" height="24" rx="3" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" strokeWidth="1.5" />
    <rect x="102" y="102" width="16" height="16" rx="2" fill="rgba(6,182,212,0.35)" />
    <path d="M56 68 L68 56" stroke="#06b6d4" strokeWidth="1.5" />
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

/* ─── Component Badges ───────────────────────────────────────────────────────── */
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

/* ─── Home Page ──────────────────────────────────────────────────────────────── */
const Home = () => {
  const { isAuthenticated, handleLogout } = useHome();

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

        {/* Gradient bridge */}
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
          <CpuIllustration />
          <div>
            <h2 className="font-display text-2xl font-semibold text-[var(--color-text-bright)] mb-2">
              Hayalindeki PC'yi Kur
            </h2>
            <p className="font-body text-sm text-[var(--color-text-muted)] max-w-[260px] mx-auto leading-relaxed">
              Uyumlu parçaları seç, adım adım sistemi oluştur, yapılandırmayı kaydet.
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

        <div className="w-full max-w-[400px] animate-fade-in-up">
          {isAuthenticated ? (
            /* ── Authenticated ── */
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
                <span className="font-mono text-xs text-[var(--color-cyan)]">Oturum açık</span>
              </div>

              <div className="mb-8">
                <h1 className="font-display text-3xl font-semibold text-[var(--color-text-bright)] mb-1.5">
                  Hoş geldin!
                </h1>
                <p className="font-body text-sm text-[var(--color-text-muted)]">
                  Build'ine devam edebilir ya da yeni bir yapılandırma başlatabilirsin.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/dashboard"
                  className="hx-btn-primary rounded-md flex items-center justify-center gap-2 no-underline"
                >
                  Dashboard'a Git
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-[0.875rem] px-8 rounded-md border border-[var(--color-border-mid)] font-display text-base font-semibold tracking-[0.1em] uppercase text-[var(--color-text-secondary)] hover:border-[var(--color-cyan)] hover:text-[var(--color-text-bright)] transition-all duration-[250ms] cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            /* ── Unauthenticated ── */
            <>
              <div className="mb-8">
                <h1 className="font-display text-3xl font-semibold text-[var(--color-text-bright)] mb-1.5">
                  Hayalindeki PC'yi Kur
                </h1>
                <p className="font-body text-sm text-[var(--color-text-muted)]">
                  Uyumlu parçaları adım adım seç, yapılandırmayı kaydet ve paylaş.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/register"
                  className="hx-btn-primary rounded-md flex items-center justify-center no-underline"
                >
                  Ücretsiz Kayıt Ol
                </Link>
                <Link
                  to="/login"
                  className="w-full py-[0.875rem] px-8 rounded-md border border-[var(--color-border-mid)] font-display text-base font-semibold tracking-[0.1em] uppercase text-[var(--color-text-secondary)] hover:border-[var(--color-cyan)] hover:text-[var(--color-text-bright)] transition-all duration-[250ms] flex items-center justify-center no-underline"
                >
                  Giriş Yap
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-[var(--color-border-dim)]">
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-[var(--color-cyan)]">8</p>
                  <p className="font-body text-xs text-[var(--color-text-dim)]">Bileşen</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-[var(--color-cyan)]">100%</p>
                  <p className="font-body text-xs text-[var(--color-text-dim)]">Uyumluluk</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-[var(--color-cyan)]">∞</p>
                  <p className="font-body text-xs text-[var(--color-text-dim)]">Yapılandırma</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
