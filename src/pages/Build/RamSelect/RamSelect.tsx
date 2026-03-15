import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSpinner,
  faSearch,
  faRotateLeft,
  faMemory,
} from "@fortawesome/free-solid-svg-icons";
import { Layout } from "../../../components";
import useRamSelect from "../../../hooks/useRamSelect";

/* ── Range input ─────────────────────────────────────────────────────────── */
const RangeRow = ({
  label,
  min,
  max,
  value,
  onChange,
  format,
}: {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  format?: (n: number) => string;
}) => {
  const fmt = format ?? ((n: number) => String(n));
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-[6px]">
        <span className="font-mono text-[0.62rem] tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
          {label}
        </span>
        <span className="font-mono text-[0.62rem] text-[var(--color-cyan)]">
          {fmt(value[0])} — {fmt(value[1])}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v <= value[1]) onChange([v, value[1]]);
          }}
          className="w-full h-[3px] accent-[var(--color-cyan)]"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= value[0]) onChange([value[0], v]);
          }}
          className="w-full h-[3px] accent-[var(--color-cyan)]"
        />
      </div>
    </div>
  );
};

/* ── Checkbox group ──────────────────────────────────────────────────────── */
const CheckGroup = ({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) => (
  <div className="mb-4">
    <span className="font-mono block text-[0.62rem] tracking-[0.1em] text-[var(--color-text-muted)] uppercase mb-[6px]">
      {label}
    </span>
    <div className="flex flex-wrap gap-[6px]">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`font-mono text-[0.6rem] tracking-[0.08em] py-[3px] px-[10px] cursor-pointer transition-all duration-150 ${
              active
                ? "bg-[rgba(6,182,212,0.15)] border border-[var(--color-cyan)] text-[var(--color-cyan)]"
                : "bg-[var(--color-bg-raised)] border border-[var(--color-border-dim)] text-[var(--color-text-muted)]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

/* ── Spec cell ───────────────────────────────────────────────────────────── */
const SpecItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-dim)] py-1.5 px-2">
    <div className="font-mono text-[0.52rem] tracking-[0.1em] text-[var(--color-text-dim)] uppercase mb-0.5">
      {label}
    </div>
    <div className="font-body text-[0.75rem] text-[var(--color-text-primary)] font-medium">
      {value}
    </div>
  </div>
);

/* ── Page ────────────────────────────────────────────────────────────────── */
const RamSelect = () => {
  const {
    filtered,
    isLoading,
    selected,
    filters,
    options,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    handleSelectById,
    handleConfirm,
  } = useRamSelect();

  return (
    <Layout>
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="animate-fade-in-down mb-6">
          <div className="font-mono text-[0.62rem] tracking-[0.2em] text-[var(--color-cyan)] uppercase mb-1">
            // ADIM 2 / 7 · BİLEŞEN SEÇİMİ
          </div>
          <h1 className="font-display text-[1.8rem] font-bold tracking-[0.04em] text-[var(--color-text-bright)] uppercase m-0 leading-[1.1]">
            Bellek{" "}
            <span className="text-[var(--color-cyan)] [text-shadow:0_0_20px_rgba(6,182,212,0.4)]">
              Seç
            </span>
          </h1>
        </div>

        {isLoading || !filters ? (
          <div className="flex items-center justify-center gap-[10px] py-16">
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin-slow text-[var(--color-cyan)]"
            />
            <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[var(--color-text-muted)]">
              YÜKLENİYOR...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-[280px_1fr] gap-6 items-start">
            {/* ── Filters sidebar ── */}
            <div className="panel accent-top animate-fade-in-up p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="font-display text-[0.85rem] font-semibold tracking-[0.1em] text-[var(--color-text-bright)] uppercase">
                  Filtreler
                </span>
                <button
                  onClick={resetFilters}
                  className="font-mono text-[0.58rem] tracking-[0.08em] text-[var(--color-text-dim)] bg-transparent border-0 cursor-pointer flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="text-[0.55rem]" />{" "}
                  Sıfırla
                </button>
              </div>

              <div className="mb-4 relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[0.65rem] text-[var(--color-text-dim)]"
                />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  placeholder="Ara..."
                  className="hx-input font-mono pl-7 text-[0.75rem] rounded-[2px]"
                />
              </div>

              <CheckGroup
                label="Marka"
                options={options.brands}
                selected={filters.brands}
                onToggle={(v) => toggleArrayFilter("brands", v)}
              />
              <CheckGroup
                label="Tip"
                options={options.types}
                selected={filters.types}
                onToggle={(v) => toggleArrayFilter("types", v)}
              />
              <RangeRow
                label="Kapasite (GB)"
                min={options.minCapacity}
                max={options.maxCapacity}
                value={filters.capacityRange}
                onChange={(v) => updateFilter("capacityRange", v)}
                format={(n) => `${n} GB`}
              />
              <RangeRow
                label="Hız (MHz)"
                min={options.minSpeed}
                max={options.maxSpeed}
                value={filters.speedRange}
                onChange={(v) => updateFilter("speedRange", v)}
                format={(n) => `${n} MHz`}
              />
            </div>

            {/* ── Right panel ── */}
            <div className="flex flex-col gap-4">
              <div className="panel accent-top corner-brackets animate-fade-in-up stagger-2 p-6">
                <label className="font-mono flex items-center gap-[6px] text-[0.65rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-2">
                  <FontAwesomeIcon icon={faMemory} className="text-[0.6rem] text-[var(--color-cyan)]" />
                  Bellek — {filtered.length} sonuç
                </label>
                <select
                  value={selected?.id ?? ""}
                  onChange={(e) => handleSelectById(e.target.value)}
                  className="hx-input hx-select font-mono"
                >
                  <option value="" disabled style={{ background: "var(--color-bg-deep)" }}>
                    — Bellek seçin —
                  </option>
                  {filtered.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      style={{ background: "var(--color-bg-deep)", color: "var(--color-text-bright)" }}
                    >
                      {item.brand} {item.model} — {item.type} · {item.capacityGb} GB
                      · {item.speedMhz} MHz · {item.modules}x Modül
                    </option>
                  ))}
                </select>

                {selected && (
                  <div className="animate-fade-in mt-4 bg-[var(--color-bg-raised)] border border-[var(--color-cyan-dim)] border-l-2 border-l-[var(--color-cyan)] p-4">
                    <div className="flex items-center gap-[14px] mb-[10px]">
                      <div className="w-[88px] h-[88px] shrink-0 bg-[rgba(0,0,0,0.5)] border border-[rgba(6,182,212,0.35)] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_16px_rgba(6,182,212,0.08)]">
                        {selected.imageUrl ? (
                          <>
                            <img
                              src={selected.imageUrl}
                              alt={`${selected.brand} ${selected.model}`}
                              className="w-full h-full object-contain p-2"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                                (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
                              }}
                            />
                            <div
                              className="absolute inset-0 items-center justify-center"
                              style={{ display: "none" }}
                            >
                              <FontAwesomeIcon
                                icon={faMemory}
                                className="text-[var(--color-cyan)] text-[1.8rem] [filter:drop-shadow(0_0_6px_rgba(6,182,212,0.8))]"
                              />
                            </div>
                          </>
                        ) : (
                          <FontAwesomeIcon
                            icon={faMemory}
                            className="text-[var(--color-cyan)] text-[1.8rem] [filter:drop-shadow(0_0_6px_rgba(6,182,212,0.8))]"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-body text-[0.9rem] font-semibold text-[var(--color-text-bright)]">
                          {selected.brand} {selected.model}
                        </div>
                        <div className="font-mono text-[0.58rem] text-[var(--color-cyan)] tracking-[0.08em]">
                          {selected.type} · {selected.capacityGb} GB
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Kapasite", value: `${selected.capacityGb} GB` },
                        { label: "Tip", value: selected.type },
                        { label: "Hız", value: `${selected.speedMhz} MHz` },
                        { label: "Modül Sayısı", value: `${selected.modules} Modül` },
                        { label: "Gecikme", value: `CL${selected.latencyCl}` },
                      ].map(({ label, value }) => (
                        <SpecItem key={label} label={label} value={value} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={!selected}
                  className="hx-btn-primary w-auto py-[10px] px-7 text-[0.78rem] tracking-[0.12em] flex items-center gap-[10px] rounded-none"
                >
                  <span>DEVAM ET</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-[0.8rem]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RamSelect;
