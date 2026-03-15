import React from "react";
import {
  faMicrochip,
  faServer,
  faMemory,
  faHardDrive,
  faBolt,
  faDesktop,
  faWind,
  faPlus,
  faChevronRight,
  faFire,
  faCheck,
  faExclamationTriangle,
  faClock,
  faChartBar,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "../../components";
import { useDashboard } from "../../hooks/useDashboard";
import type { Build, BuildActivity } from "../../types/build";

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type ComponentStatus = "selected" | "warning" | "empty";

interface PCComponent {
  id: string;
  category: string;
  label: string;
  value: string | null;
  icon: typeof faMicrochip;
  status: ComponentStatus;
  spec?: string;
  price?: number;
  accentColor: string;
  glowColor: string;
  imageUrl?: string;
}

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: typeof faChartBar;
  color: string;
}

/* ─── Static visual meta (icons + colors, NOT product data) ─────────────────── */
const COMPONENT_SLOTS = [
  { id: "cpu",     category: "İşlemci",     label: "CPU"    },
  { id: "gpu",     category: "Ekran Kartı", label: "GPU"    },
  { id: "ram",     category: "Bellek",      label: "RAM"    },
  { id: "storage", category: "Depolama",    label: "SSD"    },
  { id: "psu",     category: "Güç Kaynağı", label: "PSU"    },
  { id: "case",    category: "Kasa",        label: "CASE"   },
  { id: "cooler",  category: "Soğutucu",    label: "COOLER" },
  { id: "mobo",    category: "Anakart",     label: "MOBO"   },
] as const;

const COMPONENT_META: Record<string, { icon: typeof faMicrochip; accentColor: string; glowColor: string }> = {
  cpu:     { icon: faMicrochip,  accentColor: "rgba(6,182,212,0.8)",   glowColor: "rgba(6,182,212,0.2)"   },
  gpu:     { icon: faServer,     accentColor: "rgba(16,185,129,0.8)",  glowColor: "rgba(16,185,129,0.15)" },
  ram:     { icon: faMemory,     accentColor: "rgba(139,92,246,0.8)",  glowColor: "rgba(139,92,246,0.15)" },
  storage: { icon: faHardDrive,  accentColor: "rgba(245,158,11,0.8)",  glowColor: "rgba(245,158,11,0.12)" },
  psu:     { icon: faBolt,       accentColor: "rgba(245,158,11,0.8)",  glowColor: "rgba(245,158,11,0.12)" },
  case:    { icon: faDesktop,    accentColor: "rgba(6,182,212,0.3)",   glowColor: "rgba(6,182,212,0.04)"  },
  cooler:  { icon: faWind,       accentColor: "rgba(6,182,212,0.8)",   glowColor: "rgba(6,182,212,0.15)"  },
  mobo:    { icon: faMicrochip,  accentColor: "rgba(239,68,68,0.8)",   glowColor: "rgba(239,68,68,0.12)"  },
};

const ACTIVITY_ICON_MAP: Record<string, typeof faServer> = {
  gpu:         faServer,
  cpu:         faMicrochip,
  ram:         faMemory,
  storage:     faHardDrive,
  psu:         faBolt,
  case:        faDesktop,
  cooler:      faWind,
  motherboard: faMicrochip,
};

const ACTIVITY_COLOR_MAP: Record<string, string> = {
  gpu:         "rgba(16,185,129,0.8)",
  cpu:         "rgba(6,182,212,0.8)",
  ram:         "rgba(139,92,246,0.8)",
  storage:     "rgba(245,158,11,0.8)",
  psu:         "rgba(245,158,11,0.8)",
  case:        "rgba(6,182,212,0.8)",
  cooler:      "rgba(6,182,212,0.8)",
  motherboard: "rgba(239,68,68,0.8)",
};

/* ─── Data derivation helpers ────────────────────────────────────────────────── */
function buildToComponents(build: Build | null): PCComponent[] {
  return COMPONENT_SLOTS.map((slot) => {
    const meta = COMPONENT_META[slot.id];
    let value: string | null = null;
    let spec: string | undefined;
    let price: number | undefined;
    let imageUrl: string | undefined;
    let status: ComponentStatus = "empty";

    if (build) {
      switch (slot.id) {
        case "cpu":
          if (build.processor) {
            value    = `${build.processor.brand} ${build.processor.model}`;
            spec     = `${build.processor.cores}C / ${build.processor.threads}T · ${build.processor.baseClock} GHz`;
            price    = build.processor.price;
            imageUrl = build.processor.imageUrl;
            status   = "selected";
          }
          break;
        case "mobo":
          if (build.motherboard) {
            value    = `${build.motherboard.brand} ${build.motherboard.model}`;
            spec     = `${build.motherboard.socket} · ${build.motherboard.supportedRamType} · ${build.motherboard.chipset}`;
            price    = build.motherboard.price;
            imageUrl = build.motherboard.imageUrl;
            status   = "selected";
          }
          break;
        case "gpu":
          if (build.gpu) {
            value    = `${build.gpu.brand} ${build.gpu.model}`;
            spec     = `${build.gpu.memoryGb} GB · ${build.gpu.tdp}W`;
            imageUrl = build.gpu.imageUrl;
            status   = "selected";
          }
          break;
        case "ram":
          if (build.ram) {
            value    = `${build.ram.brand} ${build.ram.model}`;
            spec     = `${build.ram.capacityGb} GB · ${build.ram.type}-${build.ram.speedMhz}`;
            imageUrl = build.ram.imageUrl;
            status   = "selected";
          }
          break;
        case "storage":
          if (build.storage) {
            value    = `${build.storage.brand} ${build.storage.model}`;
            spec     = `${build.storage.capacityGb} GB · ${build.storage.type} · ${build.storage.interface}`;
            imageUrl = build.storage.imageUrl;
            status   = "selected";
          }
          break;
        case "psu":
          if (build.psu) {
            value    = `${build.psu.brand} ${build.psu.model}`;
            spec     = `${build.psu.wattage}W · ${build.psu.efficiencyRating}`;
            imageUrl = build.psu.imageUrl;
            status   = build.estimatedWatts > 0 && build.psu.wattage < build.estimatedWatts * 1.2
              ? "warning"
              : "selected";
          }
          break;
        case "case":
          if (build.pcCase) {
            value    = `${build.pcCase.brand} ${build.pcCase.model}`;
            spec     = build.pcCase.formFactor;
            imageUrl = build.pcCase.imageUrl;
            status   = "selected";
          }
          break;
        case "cooler":
          if (build.cooler) {
            value    = `${build.cooler.brand} ${build.cooler.model}`;
            spec     = `${build.cooler.type} · ${build.cooler.tdpW}W TDP`;
            imageUrl = build.cooler.imageUrl;
            status   = "selected";
          }
          break;
      }
    }

    const isEmpty = status === "empty";
    return {
      id:          slot.id,
      category:    slot.category,
      label:       slot.label,
      value,
      icon:        meta.icon,
      status,
      spec,
      price,
      imageUrl,
      accentColor: isEmpty ? "rgba(6,182,212,0.3)" : meta.accentColor,
      glowColor:   isEmpty ? "rgba(6,182,212,0.04)" : meta.glowColor,
    };
  });
}

function buildToStats(build: Build | null, components: PCComponent[]): StatCard[] {
  const selectedCount = components.filter((c) => c.status !== "empty").length;
  const totalCount    = components.length;
  const totalPrice    = build?.totalPrice ?? 0;
  const watts         = build?.estimatedWatts ?? 0;
  const budget        = build?.budget;
  const budgetPct     = budget && totalPrice ? Math.round((totalPrice / budget) * 100) : null;
  const psuLoad = build?.psu && watts > 0
    ? `${build.psu.wattage}W PSU · %${Math.round((watts / build.psu.wattage) * 100)} yük`
    : build?.psu
      ? `${build.psu.wattage}W PSU`
      : "PSU seçilmedi";

  return [
    {
      label: "TOPLAM FİYAT",
      value: totalPrice > 0 ? `${totalPrice.toLocaleString("tr-TR")} ₺` : "—",
      sub:   `${selectedCount} bileşen`,
      icon:  faChartBar,
      color: "var(--color-cyan)",
    },
    {
      label: "TAHMİNİ GÜÇ",
      value: watts > 0 ? `${watts}W` : "—",
      sub:   psuLoad,
      icon:  faBolt,
      color: "var(--color-amber)",
    },
    {
      label: "BÜTÇE KULLANIMI",
      value: budgetPct !== null ? `%${budgetPct}` : "—",
      sub:   budget ? `Bütçe: ${budget.toLocaleString("tr-TR")} ₺` : "Bütçe belirlenmedi",
      icon:  faFire,
      color: "#a78bfa",
    },
    {
      label: "UYUMLULUK",
      value: `${selectedCount} / ${totalCount}`,
      sub:   selectedCount < totalCount
        ? `${totalCount - selectedCount} bileşen eksik`
        : "Tüm bileşenler seçili",
      icon:  faCheck,
      color: "var(--color-success)",
    },
  ];
}

function formatTime(timestamp: string): string {
  const d = new Date(timestamp);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

/* ─── Status badge ─────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }: { status: ComponentStatus }) => {
  const map = {
    selected: { label: "SEÇİLDİ", cls: "text-[var(--color-success)] bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.25)]" },
    warning:  { label: "UYARI",   cls: "text-[var(--color-amber)] bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.25)]" },
    empty:    { label: "EKSİK",   cls: "text-[var(--color-text-dim)] bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)]" },
  };
  const s = map[status];
  return (
    <span className={`font-mono text-[0.52rem] tracking-[0.12em] border py-0.5 px-1.5 ${s.cls}`}>
      {s.label}
    </span>
  );
};

/* ─── Component card ─────────────────────────────────────────────────────────  */
const ComponentCard = ({ comp, index }: { comp: PCComponent; index: number }) => {
  const isEmpty = comp.status === "empty";
  return (
    <div
      className="animate-fade-in-up cursor-pointer transition-[transform,box-shadow,border-color] duration-200 overflow-hidden relative p-4"
      style={{
        animationDelay: `${0.04 * index}s`,
        opacity: 0,
        animationFillMode: "forwards",
        background: isEmpty ? "rgba(13,17,23,0.5)" : "var(--color-bg-surface)",
        border: `1px solid ${isEmpty ? "var(--color-border-dim)" : "var(--color-border-mid)"}`,
        borderLeft: `2px solid ${comp.accentColor}`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = `0 8px 32px ${comp.glowColor}, 0 2px 0 ${comp.accentColor} inset`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {!isEmpty && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top left, ${comp.glowColor} 0%, transparent 60%)` }}
        />
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[0.6rem] tracking-[0.15em] text-[var(--color-text-dim)] uppercase">
          {comp.label}
        </span>
        <StatusBadge status={comp.status} />
      </div>

      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 shrink-0 flex items-center justify-center relative overflow-hidden"
          style={{
            background: isEmpty ? "var(--color-bg-raised)" : `linear-gradient(135deg, rgba(0,0,0,0.6), ${comp.glowColor})`,
            border: `1px solid ${isEmpty ? "var(--color-border-dim)" : comp.accentColor}`,
          }}
        >
          {comp.imageUrl ? (
            <img
              src={comp.imageUrl}
              alt={comp.value ?? comp.label}
              className="w-full h-full object-contain p-1.5"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="absolute inset-0 items-center justify-center"
            style={{ display: comp.imageUrl ? "none" : "flex" }}
          >
            <FontAwesomeIcon
              icon={comp.icon}
              style={{
                fontSize: "1.2rem",
                color: isEmpty ? "var(--color-text-dim)" : comp.accentColor,
                filter: isEmpty ? "none" : `drop-shadow(0 0 4px ${comp.accentColor})`,
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {comp.value ? (
            <>
              <div className="font-body text-[0.85rem] font-semibold text-[var(--color-text-bright)] tracking-[0.01em] overflow-hidden text-ellipsis whitespace-nowrap mb-0.5">
                {comp.value}
              </div>
              <div className="font-mono text-[0.62rem] text-[var(--color-text-muted)] tracking-[0.05em] overflow-hidden text-ellipsis whitespace-nowrap">
                {comp.spec}
              </div>
            </>
          ) : (
            <div className="font-body text-[0.82rem] text-[var(--color-text-dim)] italic">
              Bileşen seçilmedi
            </div>
          )}
        </div>

        <div className="shrink-0 text-right">
          {comp.price ? (
            <div className="font-mono text-[0.7rem] font-semibold text-[var(--color-text-secondary)] tracking-[0.04em]">
              {comp.price.toLocaleString("tr-TR")} ₺
            </div>
          ) : (
            <div className="w-[26px] h-[26px] border border-dashed border-[var(--color-border-mid)] flex items-center justify-center text-[var(--color-text-dim)]">
              <FontAwesomeIcon icon={faPlus} className="text-[0.7rem]" />
            </div>
          )}
        </div>
      </div>

      {comp.value && (
        <div className="flex items-center justify-end mt-3 pt-[0.6rem] border-t border-[var(--color-border-dim)]">
          <span className="font-mono text-[0.58rem] text-[var(--color-text-dim)] tracking-[0.1em] flex items-center gap-1">
            DETAY
            <FontAwesomeIcon icon={faChevronRight} className="text-[0.5rem]" />
          </span>
        </div>
      )}
    </div>
  );
};

/* ─── Stat summary card ────────────────────────────────────────────────────── */
const StatSummaryCard = ({ stat, index }: { stat: StatCard; index: number }) => (
  <div
    className="animate-fade-in-up bg-[var(--color-bg-surface)] border border-[var(--color-border-dim)] p-4 px-5 relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
    style={{
      animationDelay: `${0.05 * index}s`,
      opacity: 0,
      animationFillMode: "forwards",
      borderBottom: `2px solid ${stat.color}`,
    }}
  >
    <div className="flex items-start justify-between">
      <div>
        <div className="font-mono text-[0.58rem] tracking-[0.15em] text-[var(--color-text-dim)] uppercase mb-1.5">
          {stat.label}
        </div>
        <div className="font-display text-[1.5rem] font-bold tracking-[0.04em] leading-none mb-1" style={{ color: stat.color }}>
          {stat.value}
        </div>
        <div className="font-mono text-[0.6rem] text-[var(--color-text-muted)] tracking-[0.05em]">
          {stat.sub}
        </div>
      </div>
      <div className="w-9 h-9 bg-[var(--color-bg-raised)] border border-[var(--color-border-dim)] flex items-center justify-center">
        <FontAwesomeIcon icon={stat.icon} style={{ color: stat.color, fontSize: "0.95rem" }} />
      </div>
    </div>
  </div>
);

/* ─── Build progress bar ───────────────────────────────────────────────────── */
const BuildProgress = ({ components }: { components: PCComponent[] }) => {
  const filled = components.filter((c) => c.status !== "empty").length;
  const total  = components.length;
  const pct    = total > 0 ? Math.round((filled / total) * 100) : 0;

  return (
    <div
      className="animate-fade-in-up bg-[var(--color-bg-surface)] border border-[var(--color-border-dim)] py-5 px-6"
      style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-display text-[0.95rem] font-semibold tracking-[0.06em] text-[var(--color-text-bright)] uppercase">
            Build Tamamlanma
          </span>
          <span className="font-mono ml-3 text-[0.65rem] text-[var(--color-text-muted)] tracking-[0.08em]">
            {filled}/{total} bileşen
          </span>
        </div>
        <span className="font-display text-[1.4rem] font-bold text-[var(--color-cyan)] tracking-[0.04em]">
          {pct}%
        </span>
      </div>

      <div className="h-1.5 bg-[var(--color-bg-raised)] border border-[var(--color-border-dim)] relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 bg-[linear-gradient(90deg,var(--color-cyan-mid),var(--color-cyan-bright))] shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-[width] duration-1000"
          style={{ width: `${pct}%` }}
        />
        {Array.from({ length: total - 1 }).map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px bg-[var(--color-bg-elevated)]" style={{ left: `${((i + 1) / total) * 100}%` }} />
        ))}
      </div>

      <div className="flex mt-1.5">
        {components.map((c) => (
          <div
            key={c.id}
            className={`font-mono flex-1 text-center text-[0.48rem] tracking-[0.05em] uppercase ${c.status !== "empty" ? "text-[var(--color-cyan)]" : "text-[var(--color-text-dim)]"}`}
          >
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Activity feed ────────────────────────────────────────────────────────── */
const ActivityFeed = ({ activities }: { activities: BuildActivity[] }) => (
  <div
    className="animate-fade-in-up bg-[var(--color-bg-surface)] border border-[var(--color-border-dim)] p-5"
    style={{ animationDelay: "0.15s", opacity: 0, animationFillMode: "forwards" }}
  >
    <div className="flex items-center justify-between mb-4">
      <span className="font-display text-[0.85rem] font-semibold tracking-[0.1em] text-[var(--color-text-bright)] uppercase">
        Son Aktivite
      </span>
      <span className="font-mono text-[0.56rem] text-[var(--color-cyan)] tracking-[0.1em] flex items-center gap-1">
        <FontAwesomeIcon icon={faClock} />
        CANLI
      </span>
    </div>

    {activities.length === 0 ? (
      <div className="font-body text-[0.78rem] text-[var(--color-text-dim)] italic text-center py-4">
        Henüz aktivite yok
      </div>
    ) : (
      <div className="flex flex-col">
        {activities.map((a, i) => {
          const icon  = ACTIVITY_ICON_MAP[a.componentType] ?? faMicrochip;
          const color = ACTIVITY_COLOR_MAP[a.componentType] ?? "rgba(6,182,212,0.8)";
          return (
            <div
              key={a.id}
              className="flex items-center gap-2.5 py-2"
              style={{ borderBottom: i < activities.length - 1 ? "1px solid var(--color-border-dim)" : "none" }}
            >
              <div
                className="w-7 h-7 shrink-0 bg-[var(--color-bg-raised)] flex items-center justify-center"
                style={{ border: `1px solid ${color}` }}
              >
                <FontAwesomeIcon icon={icon} style={{ fontSize: "0.65rem", color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body text-[0.78rem] text-[var(--color-text-primary)] font-medium">{a.action}</div>
                <div className="font-mono text-[0.58rem] text-[var(--color-text-muted)] tracking-[0.04em]">{a.detail}</div>
              </div>
              <span className="font-mono text-[0.58rem] text-[var(--color-text-dim)] shrink-0">
                {formatTime(a.timestamp)}
              </span>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

/* ─── Warnings panel ─────────────────────────────────────────────────────────── */
const WarningsPanel = ({ warnings }: { warnings: string[] }) => {
  if (warnings.length === 0) return null;
  return (
    <div
      className="animate-fade-in-up bg-[var(--color-bg-surface)] border border-[var(--color-border-dim)] border-l-2 border-l-[var(--color-amber)] p-5"
      style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
    >
      <div className="font-display text-[0.82rem] font-semibold tracking-[0.1em] text-[var(--color-amber)] uppercase mb-3.5 flex items-center gap-1.5">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-[0.75rem]" />
        Uyarılar
      </div>
      <div className="flex flex-col gap-2.5">
        {warnings.map((tip, i) => (
          <div
            key={i}
            className="font-body text-[0.75rem] text-[var(--color-text-muted)] leading-[1.5] py-2 flex gap-2"
            style={{ borderBottom: i < warnings.length - 1 ? "1px solid var(--color-border-dim)" : "none" }}
          >
            <span className="text-[var(--color-amber)] shrink-0 text-[0.7rem] mt-0.5">▸</span>
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Performance panel ───────────────────────────────────────────────────────── */
const PerformancePanel = ({ estimate }: { estimate: { gaming4K: number; rendering: number; general: number } | undefined }) => {
  if (!estimate) return null;
  const bars = [
    { label: "Gaming (4K)",    value: estimate.gaming4K,  color: "var(--color-cyan)"    },
    { label: "Rendering",      value: estimate.rendering, color: "#a78bfa"              },
    { label: "Genel Kullanım", value: estimate.general,   color: "var(--color-success)" },
  ];
  return (
    <div
      className="animate-fade-in-up bg-[var(--color-bg-surface)] border border-[var(--color-border-dim)] p-5"
      style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
    >
      <div className="font-display text-[0.82rem] font-semibold tracking-[0.1em] text-[var(--color-text-secondary)] uppercase mb-3.5">
        Performans Tahmini
      </div>
      {bars.map((perf) => (
        <div key={perf.label} className="mb-2.5">
          <div className="flex justify-between mb-1">
            <span className="font-mono text-[0.6rem] text-[var(--color-text-muted)] tracking-[0.08em]">{perf.label}</span>
            <span className="font-mono text-[0.6rem]" style={{ color: perf.color }}>{perf.value}</span>
          </div>
          <div className="h-1 bg-[var(--color-bg-raised)] border border-[var(--color-border-dim)] relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{ width: `${perf.value}%`, background: `linear-gradient(90deg, ${perf.color}80, ${perf.color})` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── Dashboard Page ─────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const { build, activities, loading } = useDashboard();
  const components = buildToComponents(build);
  const stats      = buildToStats(build, components);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] gap-3 text-[var(--color-text-muted)]">
          <FontAwesomeIcon icon={faSpinner} spin className="text-[1.2rem] text-[var(--color-cyan)]" />
          <span className="font-mono text-[0.8rem] tracking-[0.1em]">BUILD YÜKLENİYOR...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto">

        {/* ── Welcome header ── */}
        <div className="animate-fade-in-down flex items-end justify-between mb-7 flex-wrap gap-3">
          <div>
            <div className="font-mono text-[0.62rem] tracking-[0.2em] text-[var(--color-cyan)] uppercase mb-1">
              &#47;&#47; KONTROL PANELİ · AKTİF BUILD
            </div>
            <h1 className="font-display text-[2rem] font-bold tracking-[0.04em] text-[var(--color-text-bright)] uppercase m-0 leading-[1.1]">
              Hoş Geldiniz,{" "}
              <span className="text-[var(--color-cyan)] [text-shadow:0_0_20px_rgba(6,182,212,0.4)]">Build</span>
            </h1>
            <p className="font-body text-[0.85rem] text-[var(--color-text-muted)] mt-1 tracking-[0.02em]">
              PC konfigürasyonunuzu yönetin ve optimize edin.
            </p>
          </div>

          <div className="flex gap-2.5 items-center">
            <button
              className="font-mono bg-[var(--color-bg-surface)] border border-[var(--color-border-mid)] text-[var(--color-text-secondary)] py-2 px-4 text-[0.68rem] tracking-[0.12em] uppercase cursor-pointer transition-[border-color,color] duration-200 hover:border-[var(--color-cyan-mid)] hover:text-[var(--color-cyan)]"
            >
              Build Paylaş
            </button>
            <button className="font-mono hx-btn-primary w-auto py-2 px-5 text-[0.68rem] tracking-[0.12em] flex items-center gap-1.5 rounded-none">
              <FontAwesomeIcon icon={faPlus} className="text-[0.7rem]" />
              Yeni Build
            </button>
          </div>
        </div>

        {/* ── Stat summary row ── */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
          {stats.map((s, i) => <StatSummaryCard key={s.label} stat={s} index={i} />)}
        </div>

        {/* ── Build progress ── */}
        <div className="mb-6">
          <BuildProgress components={components} />
        </div>

        {/* ── Main content: component grid + sidebar ── */}
        <div className="grid grid-cols-[1fr_300px] gap-6 items-start">

          {/* Component grid */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="font-display text-[0.9rem] font-semibold tracking-[0.12em] text-[var(--color-text-secondary)] uppercase">
                Bileşenler
              </span>
              <span className="font-mono text-[0.58rem] text-[var(--color-text-dim)] tracking-[0.1em]">
                {components.length} SLOT · {components.filter((c) => c.status === "selected").length} SEÇİLİ
              </span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              {components.map((comp, i) => <ComponentCard key={comp.id} comp={comp} index={i} />)}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <ActivityFeed activities={activities} />
            <WarningsPanel warnings={build?.warnings ?? []} />
            <PerformancePanel estimate={build?.performanceEstimate} />
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
