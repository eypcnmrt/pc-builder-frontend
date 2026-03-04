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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "../../components";

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
}

/* ─── Mock Data ─────────────────────────────────────────────────────────────── */
const components: PCComponent[] = [
  {
    id: "cpu",
    category: "İşlemci",
    label: "CPU",
    value: "AMD Ryzen 9 7950X",
    icon: faMicrochip,
    status: "selected",
    spec: "16C / 32T · 4.5 GHz",
    price: 14999,
    accentColor: "rgba(6,182,212,0.8)",
    glowColor: "rgba(6,182,212,0.2)",
  },
  {
    id: "gpu",
    category: "Ekran Kartı",
    label: "GPU",
    value: "NVIDIA RTX 4090",
    icon: faServer,
    status: "selected",
    spec: "24 GB GDDR6X · 450W",
    price: 54999,
    accentColor: "rgba(16,185,129,0.8)",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    id: "ram",
    category: "Bellek",
    label: "RAM",
    value: "G.Skill Trident Z5 RGB",
    icon: faMemory,
    status: "selected",
    spec: "32 GB (2×16) · DDR5-6400",
    price: 4299,
    accentColor: "rgba(139,92,246,0.8)",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    id: "storage",
    category: "Depolama",
    label: "SSD",
    value: "Samsung 990 Pro",
    icon: faHardDrive,
    status: "selected",
    spec: "2 TB · NVMe Gen4 · 7400 MB/s",
    price: 3299,
    accentColor: "rgba(245,158,11,0.8)",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    id: "psu",
    category: "Güç Kaynağı",
    label: "PSU",
    value: "Corsair HX1000i",
    icon: faBolt,
    status: "warning",
    spec: "1000W · 80+ Platinum",
    price: 5499,
    accentColor: "rgba(245,158,11,0.8)",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    id: "case",
    category: "Kasa",
    label: "CASE",
    value: null,
    icon: faDesktop,
    status: "empty",
    spec: undefined,
    price: undefined,
    accentColor: "rgba(6,182,212,0.3)",
    glowColor: "rgba(6,182,212,0.04)",
  },
  {
    id: "cooler",
    category: "Soğutucu",
    label: "COOLER",
    value: "Noctua NH-D15S",
    icon: faWind,
    status: "selected",
    spec: "Dual Tower · 300W TDP",
    price: 2799,
    accentColor: "rgba(6,182,212,0.8)",
    glowColor: "rgba(6,182,212,0.15)",
  },
  {
    id: "mobo",
    category: "Anakart",
    label: "MOBO",
    value: "ASUS ROG Crosshair X670E",
    icon: faMicrochip,
    status: "selected",
    spec: "AM5 · DDR5 · PCIe 5.0",
    price: 12499,
    accentColor: "rgba(239,68,68,0.8)",
    glowColor: "rgba(239,68,68,0.12)",
  },
];

/* ─── Stat summary cards ───────────────────────────────────────────────────── */
interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: typeof faChartBar;
  color: string;
}

const stats: StatCard[] = [
  { label: "TOPLAM FİYAT", value: "98.393 ₺", sub: "8 bileşen", icon: faChartBar, color: "var(--color-cyan)" },
  { label: "TAHMINI GÜÇ", value: "620W", sub: "1000W PSU · %62 yük", icon: faBolt, color: "var(--color-amber)" },
  { label: "BÜTÇE KULLANIMI", value: "%78", sub: "Budget: 125.000 ₺", icon: faFire, color: "#a78bfa" },
  { label: "UYUMLULUK", value: "7 / 8", sub: "1 bileşen eksik", icon: faCheck, color: "var(--color-success)" },
];

/* ─── Status badge ─────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }: { status: ComponentStatus }) => {
  const map = {
    selected: { label: "SEÇİLDİ", color: "var(--color-success)", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)" },
    warning:  { label: "UYARI", color: "var(--color-amber)", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" },
    empty:    { label: "EKSİK", color: "var(--color-text-dim)", bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" },
  };
  const s = map[status];
  return (
    <span
      className="font-mono"
      style={{
        fontSize: "0.52rem",
        letterSpacing: "0.12em",
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        padding: "2px 6px",
      }}
    >
      {s.label}
    </span>
  );
};

/* ─── Component card ─────────────────────────────────────────────────────────  */
const ComponentCard = ({ comp, index }: { comp: PCComponent; index: number }) => {
  const isEmpty = comp.status === "empty";

  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: `${0.04 * index}s`,
        opacity: 0,
        animationFillMode: "forwards",
        background: isEmpty ? "rgba(13,17,23,0.5)" : "var(--color-bg-surface)",
        border: `1px solid ${isEmpty ? "var(--color-border-dim)" : "var(--color-border-mid)"}`,
        borderLeft: `2px solid ${comp.accentColor}`,
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
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
      {/* inner glow */}
      {!isEmpty && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at top left, ${comp.glowColor} 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Category label + status */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <span
          className="font-mono"
          style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--color-text-dim)", textTransform: "uppercase" }}
        >
          {comp.label}
        </span>
        <StatusBadge status={comp.status} />
      </div>

      {/* Icon + info */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Icon box */}
        <div
          style={{
            width: "40px",
            height: "40px",
            flexShrink: 0,
            background: isEmpty ? "var(--color-bg-raised)" : `linear-gradient(135deg, rgba(0,0,0,0.5), ${comp.glowColor})`,
            border: `1px solid ${isEmpty ? "var(--color-border-dim)" : comp.accentColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <FontAwesomeIcon
            icon={comp.icon}
            style={{
              fontSize: "1.1rem",
              color: isEmpty ? "var(--color-text-dim)" : comp.accentColor,
              filter: isEmpty ? "none" : `drop-shadow(0 0 4px ${comp.accentColor})`,
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {comp.value ? (
            <>
              <div
                className="font-body"
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--color-text-bright)",
                  letterSpacing: "0.01em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: "2px",
                }}
              >
                {comp.value}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: "0.62rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.05em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {comp.spec}
              </div>
            </>
          ) : (
            <div
              className="font-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-text-dim)",
                fontStyle: "italic",
              }}
            >
              Bileşen seçilmedi
            </div>
          )}
        </div>

        {/* Price or add button */}
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          {comp.price ? (
            <div
              className="font-mono"
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                letterSpacing: "0.04em",
              }}
            >
              {comp.price.toLocaleString("tr-TR")} ₺
            </div>
          ) : (
            <div
              style={{
                width: "26px",
                height: "26px",
                border: "1px dashed var(--color-border-mid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-dim)",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ fontSize: "0.7rem" }} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      {comp.value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "0.75rem",
            paddingTop: "0.6rem",
            borderTop: "1px solid var(--color-border-dim)",
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "0.58rem",
              color: "var(--color-text-dim)",
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            DETAY
            <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "0.5rem" }} />
          </span>
        </div>
      )}
    </div>
  );
};

/* ─── Stat summary card ────────────────────────────────────────────────────── */
const StatSummaryCard = ({ stat, index }: { stat: StatCard; index: number }) => (
  <div
    className="animate-fade-in-up"
    style={{
      animationDelay: `${0.05 * index}s`,
      opacity: 0,
      animationFillMode: "forwards",
      background: "var(--color-bg-surface)",
      border: "1px solid var(--color-border-dim)",
      borderBottom: `2px solid ${stat.color}`,
      padding: "1rem 1.25rem",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
  >
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "32px",
        background: `linear-gradient(to top, ${stat.color.replace(')', ', 0.06)').replace('var', 'rgba').replace('(--color-', '(')}, transparent)`,
        pointerEvents: "none",
      }}
    />

    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div>
        <div
          className="font-mono"
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.15em",
            color: "var(--color-text-dim)",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          {stat.label}
        </div>
        <div
          className="font-display"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: stat.color,
            letterSpacing: "0.04em",
            lineHeight: 1,
            marginBottom: "4px",
          }}
        >
          {stat.value}
        </div>
        <div
          className="font-mono"
          style={{ fontSize: "0.6rem", color: "var(--color-text-muted)", letterSpacing: "0.05em" }}
        >
          {stat.sub}
        </div>
      </div>
      <div
        style={{
          width: "36px",
          height: "36px",
          background: "var(--color-bg-raised)",
          border: "1px solid var(--color-border-dim)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={stat.icon} style={{ color: stat.color, fontSize: "0.95rem" }} />
      </div>
    </div>
  </div>
);

/* ─── Build progress bar ───────────────────────────────────────────────────── */
const BuildProgress = () => {
  const filled = components.filter((c) => c.status !== "empty").length;
  const total = components.length;
  const pct = Math.round((filled / total) * 100);

  return (
    <div
      className="animate-fade-in-up"
      style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border-dim)",
        padding: "1.25rem 1.5rem",
        animationDelay: "0.1s",
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div>
          <span
            className="font-display"
            style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--color-text-bright)", textTransform: "uppercase" }}
          >
            Build Tamamlanma
          </span>
          <span
            className="font-mono"
            style={{ marginLeft: "12px", fontSize: "0.65rem", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}
          >
            {filled}/{total} bileşen
          </span>
        </div>
        <span
          className="font-display"
          style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-cyan)", letterSpacing: "0.04em" }}
        >
          {pct}%
        </span>
      </div>

      {/* Progress track */}
      <div
        style={{
          height: "6px",
          background: "var(--color-bg-raised)",
          border: "1px solid var(--color-border-dim)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${pct}%`,
            background: "linear-gradient(90deg, var(--color-cyan-mid), var(--color-cyan-bright))",
            boxShadow: "0 0 8px rgba(6,182,212,0.6)",
            transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        {/* tick marks */}
        {Array.from({ length: total - 1 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${((i + 1) / total) * 100}%`,
              top: 0,
              bottom: 0,
              width: "1px",
              background: "var(--color-bg-elevated)",
            }}
          />
        ))}
      </div>

      {/* Segment labels */}
      <div style={{ display: "flex", marginTop: "6px" }}>
        {components.map((c) => (
          <div
            key={c.id}
            className="font-mono"
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "0.48rem",
              letterSpacing: "0.05em",
              color: c.status !== "empty" ? "var(--color-cyan)" : "var(--color-text-dim)",
              textTransform: "uppercase",
            }}
          >
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Recent activity ──────────────────────────────────────────────────────── */
const activities = [
  { time: "09:42", action: "GPU güncellendi", detail: "RTX 4080 → RTX 4090", icon: faServer, color: "rgba(16,185,129,0.8)" },
  { time: "09:38", action: "PSU uyarısı", detail: "Güç yeterliliği kontrol edilmeli", icon: faExclamationTriangle, color: "rgba(245,158,11,0.8)" },
  { time: "09:31", action: "RAM eklendi", detail: "G.Skill Trident Z5 RGB 32GB", icon: faMemory, color: "rgba(139,92,246,0.8)" },
  { time: "09:15", action: "Build oluşturuldu", detail: "Yeni konfigürasyon başlatıldı", icon: faMicrochip, color: "rgba(6,182,212,0.8)" },
];

const ActivityFeed = () => (
  <div
    className="animate-fade-in-up"
    style={{
      background: "var(--color-bg-surface)",
      border: "1px solid var(--color-border-dim)",
      padding: "1.25rem",
      animationDelay: "0.15s",
      opacity: 0,
      animationFillMode: "forwards",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
      <span
        className="font-display"
        style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", color: "var(--color-text-bright)", textTransform: "uppercase" }}
      >
        Son Aktivite
      </span>
      <span
        className="font-mono"
        style={{ fontSize: "0.56rem", color: "var(--color-cyan)", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "4px" }}
      >
        <FontAwesomeIcon icon={faClock} />
        CANLI
      </span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {activities.map((a, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 0",
            borderBottom: i < activities.length - 1 ? "1px solid var(--color-border-dim)" : "none",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              flexShrink: 0,
              background: "var(--color-bg-raised)",
              border: `1px solid ${a.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={a.icon} style={{ fontSize: "0.65rem", color: a.color }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="font-body" style={{ fontSize: "0.78rem", color: "var(--color-text-primary)", fontWeight: 500 }}>
              {a.action}
            </div>
            <div className="font-mono" style={{ fontSize: "0.58rem", color: "var(--color-text-muted)", letterSpacing: "0.04em" }}>
              {a.detail}
            </div>
          </div>
          <span className="font-mono" style={{ fontSize: "0.58rem", color: "var(--color-text-dim)", flexShrink: 0 }}>
            {a.time}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Dashboard Page ─────────────────────────────────────────────────────────── */
const Dashboard = () => {
  return (
    <Layout>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Welcome header ── */}
        <div
          className="animate-fade-in-down"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: "var(--color-cyan)",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              &#47;&#47; KONTROL PANELİ · AKTİF BUILD
            </div>
            <h1
              className="font-display"
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "var(--color-text-bright)",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Hoş Geldiniz,{" "}
              <span style={{ color: "var(--color-cyan)", textShadow: "0 0 20px rgba(6,182,212,0.4)" }}>
                Build
              </span>
            </h1>
            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                marginTop: "4px",
                letterSpacing: "0.02em",
              }}
            >
              PC konfigürasyonunuzu yönetin ve optimize edin.
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className="font-mono"
              style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-mid)",
                color: "var(--color-text-secondary)",
                padding: "8px 16px",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-cyan-mid)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-cyan)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-mid)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)";
              }}
            >
              Build Paylaş
            </button>
            <button
              className="font-mono hx-btn-primary"
              style={{
                width: "auto",
                padding: "8px 20px",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "0",
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ fontSize: "0.7rem" }} />
              Yeni Build
            </button>
          </div>
        </div>

        {/* ── Stat summary row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {stats.map((s, i) => (
            <StatSummaryCard key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* ── Build progress ── */}
        <div style={{ marginBottom: "1.5rem" }}>
          <BuildProgress />
        </div>

        {/* ── Main content: component grid + sidebar ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          {/* Component grid */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.875rem",
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                }}
              >
                Bileşenler
              </span>
              <span
                className="font-mono"
                style={{ fontSize: "0.58rem", color: "var(--color-text-dim)", letterSpacing: "0.1em" }}
              >
                {components.length} SLOT · {components.filter((c) => c.status === "selected").length} SEÇİLİ
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {components.map((comp, i) => (
                <ComponentCard key={comp.id} comp={comp} index={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ActivityFeed />

            {/* Quick tips panel */}
            <div
              className="animate-fade-in-up"
              style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-dim)",
                borderLeft: "2px solid var(--color-amber)",
                padding: "1.25rem",
                animationDelay: "0.2s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "var(--color-amber)",
                  textTransform: "uppercase",
                  marginBottom: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: "0.75rem" }} />
                Uyarılar
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "PSU gücü GPU + CPU TDP değerini karşılıyor; kasa seçimi yapılmadı.",
                  "DDR5-6400 hızı için XMP/EXPO profilini BIOS'tan aktive edin.",
                  "NH-D15S yüksekliği 165mm — kasa uyumluluğunu kontrol edin.",
                ].map((tip, i) => (
                  <div
                    key={i}
                    className="font-body"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.5,
                      padding: "8px 0",
                      borderBottom: i < 2 ? "1px solid var(--color-border-dim)" : "none",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--color-amber)", flexShrink: 0, fontSize: "0.7rem", marginTop: "2px" }}>▸</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Estimated performance */}
            <div
              className="animate-fade-in-up"
              style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-dim)",
                padding: "1.25rem",
                animationDelay: "0.25s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  marginBottom: "0.875rem",
                }}
              >
                Performans Tahmini
              </div>

              {[
                { label: "Gaming (4K)", value: 94, color: "var(--color-cyan)" },
                { label: "Rendering", value: 88, color: "#a78bfa" },
                { label: "Genel Kullanım", value: 98, color: "var(--color-success)" },
              ].map((perf) => (
                <div key={perf.label} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}>
                      {perf.label}
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.6rem", color: perf.color }}>
                      {perf.value}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      background: "var(--color-bg-raised)",
                      border: "1px solid var(--color-border-dim)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${perf.value}%`,
                        background: `linear-gradient(90deg, ${perf.color}80, ${perf.color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
