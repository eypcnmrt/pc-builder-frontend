import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip, faArrowRight, faSpinner, faSearch, faRotateLeft, faServer,
} from "@fortawesome/free-solid-svg-icons";
import { Layout } from "../../../components";
import useProcessorSelect from "../../../hooks/useProcessorSelect";

/* ── Range input ─────────────────────────────────────────────────────────── */
const RangeRow = ({
  label, min, max, value, onChange, format,
}: {
  label: string; min: number; max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  format?: (n: number) => string;
}) => {
  const fmt = format ?? ((n: number) => String(n));
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-[0.62rem] tracking-[0.1em] text-[var(--color-text-muted)] uppercase">{label}</span>
        <span className="font-mono text-[0.62rem] text-[var(--color-cyan)]">
          {fmt(value[0])} — {fmt(value[1])}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <input type="range" min={min} max={max} value={value[0]}
          onChange={(e) => { const v = Number(e.target.value); if (v <= value[1]) onChange([v, value[1]]); }}
          className="w-full h-[3px] accent-[var(--color-cyan)]" />
        <input type="range" min={min} max={max} value={value[1]}
          onChange={(e) => { const v = Number(e.target.value); if (v >= value[0]) onChange([value[0], v]); }}
          className="w-full h-[3px] accent-[var(--color-cyan)]" />
      </div>
    </div>
  );
};

/* ── Checkbox group ──────────────────────────────────────────────────────── */
const CheckGroup = ({ label, options, selected, onToggle }: {
  label: string; options: string[]; selected: string[]; onToggle: (v: string) => void;
}) => (
  <div className="mb-4">
    <span className="font-mono text-[0.62rem] tracking-[0.1em] text-[var(--color-text-muted)] uppercase block mb-1.5">{label}</span>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button key={opt} onClick={() => onToggle(opt)} className={`font-mono text-[0.6rem] tracking-[0.08em] py-[3px] px-[10px] cursor-pointer transition-all duration-150 ${active ? "bg-[rgba(6,182,212,0.15)] border border-[var(--color-cyan)] text-[var(--color-cyan)]" : "bg-[var(--color-bg-raised)] border border-[var(--color-border-dim)] text-[var(--color-text-muted)]"}`}>
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

/* ── Radio group ─────────────────────────────────────────────────────────── */
const RadioGroup = ({ label, options, value, onChange }: {
  label: string; options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void;
}) => (
  <div className="mb-4">
    <span className="font-mono text-[0.62rem] tracking-[0.1em] text-[var(--color-text-muted)] uppercase block mb-1.5">{label}</span>
    <div className="flex gap-1.5">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button key={opt.value} onClick={() => onChange(opt.value)} className={`font-mono text-[0.6rem] tracking-[0.08em] py-[3px] px-3 cursor-pointer transition-all duration-150 ${active ? "bg-[rgba(6,182,212,0.15)] border border-[var(--color-cyan)] text-[var(--color-cyan)]" : "bg-[var(--color-bg-raised)] border border-[var(--color-border-dim)] text-[var(--color-text-muted)]"}`}>
            {opt.label}
          </button>
        );
      })}
    </div>
  </div>
);

/* ── Spec grid item ──────────────────────────────────────────────────────── */
const SpecItem = ({ label, value }: { label: string; value: string | boolean }) => (
  <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-dim)] py-1.5 px-2">
    <div className="font-mono text-[0.52rem] tracking-[0.1em] text-[var(--color-text-dim)] uppercase mb-0.5">{label}</div>
    <div className="font-body text-[0.75rem] text-[var(--color-text-primary)] font-medium">{String(value)}</div>
  </div>
);

/* ── Product image box ───────────────────────────────────────────────────── */
const ProductImageBox = ({ imageUrl, fallbackIcon, alt }: {
  imageUrl?: string;
  fallbackIcon: typeof faMicrochip;
  alt: string;
}) => (
  <div className="w-[88px] h-[88px] shrink-0 bg-[rgba(0,0,0,0.5)] border border-[rgba(6,182,212,0.35)] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_16px_rgba(6,182,212,0.08)]">
    {imageUrl ? (
      <>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
          }}
        />
        <div className="absolute inset-0 items-center justify-center" style={{ display: "none" }}>
          <FontAwesomeIcon icon={fallbackIcon} className="text-[var(--color-cyan)] text-[1.8rem] drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
        </div>
      </>
    ) : (
      <FontAwesomeIcon icon={fallbackIcon} className="text-[var(--color-cyan)] text-[1.8rem] drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
    )}
  </div>
);

/* ── Page ────────────────────────────────────────────────────────────────── */
const ProcessorSelect = () => {
  const {
    filtered, isLoading, selected, filters, options,
    updateFilter, toggleArrayFilter, resetFilters,
    handleSelectById,
    motherboardFilters, selectedMotherboard, isMotherboardLoading,
    motherboardOptions, filteredMotherboards,
    updateMotherboardFilter, toggleMotherboardArrayFilter, resetMotherboardFilters,
    handleMotherboardSelectById,
    handleConfirm,
  } = useProcessorSelect();

  return (
    <Layout>
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="animate-fade-in-down mb-6">
          <div className="font-mono text-[0.62rem] tracking-[0.2em] text-[var(--color-cyan)] uppercase mb-1">
            // ADIM 1 / 8 · BİLEŞEN SEÇİMİ
          </div>
          <h1 className="font-display text-[1.8rem] font-bold tracking-[0.04em] text-[var(--color-text-bright)] uppercase m-0 leading-[1.1]">
            İşlemci <span className="text-[var(--color-cyan)] [text-shadow:0_0_20px_rgba(6,182,212,0.4)]">Seç</span>
          </h1>
        </div>

        {isLoading || !filters ? (
          <div className="flex items-center justify-center gap-2.5 py-16">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow text-[var(--color-cyan)]" />
            <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[var(--color-text-muted)]">YÜKLENİYOR...</span>
          </div>
        ) : (
          <div className="grid grid-cols-[280px_1fr] gap-6 items-start">

            {/* ── Filters sidebar ── */}
            <div className="panel accent-top animate-fade-in-up p-5">

              {/* Processor filters */}
              {!selected && (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display text-[0.85rem] font-semibold tracking-[0.1em] text-[var(--color-text-bright)] uppercase">Filtreler</span>
                    <button onClick={resetFilters} className="font-mono text-[0.58rem] tracking-[0.08em] text-[var(--color-text-dim)] bg-transparent border-0 cursor-pointer flex items-center gap-1">
                      <FontAwesomeIcon icon={faRotateLeft} className="text-[0.55rem]" /> Sıfırla
                    </button>
                  </div>

                  <div className="mb-4 relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[0.65rem] text-[var(--color-text-dim)]" />
                    <input type="text" value={filters.search} onChange={(e) => updateFilter("search", e.target.value)}
                      placeholder="Ara..." className="hx-input font-mono rounded-[2px] pl-7 text-[0.75rem]" />
                  </div>

                  <CheckGroup label="Marka" options={options.brands} selected={filters.brands} onToggle={(v) => toggleArrayFilter("brands", v)} />
                  <CheckGroup label="Soket" options={options.sockets} selected={filters.sockets} onToggle={(v) => toggleArrayFilter("sockets", v)} />
                  <CheckGroup label="Bellek Tipi" options={options.memoryTypes} selected={filters.memoryTypes} onToggle={(v) => toggleArrayFilter("memoryTypes", v)} />
                  <RadioGroup label="Entegre Ekran Kartı" value={filters.integratedGraphics}
                    onChange={(v) => updateFilter("integratedGraphics", v as "all" | "yes" | "no")}
                    options={[{ value: "all", label: "Tümü" }, { value: "yes", label: "Var" }, { value: "no", label: "Yok" }]} />
                  <RangeRow label="Çekirdek" min={options.minCores} max={options.maxCores} value={filters.coreRange} onChange={(v) => updateFilter("coreRange", v)} />
                  <RangeRow label="Fiyat (₺)" min={options.minPrice} max={options.maxPrice} value={filters.priceRange} onChange={(v) => updateFilter("priceRange", v)} format={(n) => `${n.toLocaleString("tr-TR")} ₺`} />
                  <RangeRow label="Boost Hızı (GHz)" min={options.minBoost} max={options.maxBoost} value={filters.boostClockRange} onChange={(v) => updateFilter("boostClockRange", v)} format={(n) => `${n} GHz`} />
                  <RangeRow label="TDP (W)" min={options.minTdp} max={options.maxTdp} value={filters.tdpRange} onChange={(v) => updateFilter("tdpRange", v)} format={(n) => `${n}W`} />
                </>
              )}

              {/* Motherboard filters */}
              {selected && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="font-display text-[0.85rem] font-semibold tracking-[0.1em] text-[var(--color-text-bright)] uppercase">Anakart</span>
                      <div className="font-mono text-[0.55rem] tracking-[0.08em] text-[var(--color-cyan)] mt-0.5">Filtreler</div>
                    </div>
                    <button onClick={resetMotherboardFilters} className="font-mono text-[0.58rem] tracking-[0.08em] text-[var(--color-text-dim)] bg-transparent border-0 cursor-pointer flex items-center gap-1">
                      <FontAwesomeIcon icon={faRotateLeft} className="text-[0.55rem]" /> Sıfırla
                    </button>
                  </div>

                  {motherboardFilters && (
                    <>
                      <div className="mb-4 relative">
                        <FontAwesomeIcon icon={faSearch} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[0.65rem] text-[var(--color-text-dim)]" />
                        <input type="text" value={motherboardFilters.search} onChange={(e) => updateMotherboardFilter("search", e.target.value)}
                          placeholder="Ara..." className="hx-input font-mono rounded-[2px] pl-7 text-[0.75rem]" />
                      </div>

                      <CheckGroup label="Marka" options={motherboardOptions.brands} selected={motherboardFilters.brands} onToggle={(v) => toggleMotherboardArrayFilter("brands", v)} />
                      <CheckGroup label="Chipset" options={motherboardOptions.chipsets} selected={motherboardFilters.chipsets} onToggle={(v) => toggleMotherboardArrayFilter("chipsets", v)} />
                      <CheckGroup label="Form Faktörü" options={motherboardOptions.formFactors} selected={motherboardFilters.formFactors} onToggle={(v) => toggleMotherboardArrayFilter("formFactors", v)} />
                      <CheckGroup label="RAM Tipi" options={motherboardOptions.supportedRamTypes} selected={motherboardFilters.supportedRamTypes} onToggle={(v) => toggleMotherboardArrayFilter("supportedRamTypes", v)} />
                      <RangeRow label="RAM Slot Sayısı" min={motherboardOptions.minRamSlots} max={motherboardOptions.maxRamSlots} value={motherboardFilters.ramSlotsRange} onChange={(v) => updateMotherboardFilter("ramSlotsRange", v)} />
                      <RangeRow label="Maks RAM (GB)" min={motherboardOptions.minMaxRam} max={motherboardOptions.maxMaxRam} value={motherboardFilters.maxRamRange} onChange={(v) => updateMotherboardFilter("maxRamRange", v)} format={(n) => `${n} GB`} />
                    </>
                  )}

                  {!motherboardFilters && !isMotherboardLoading && (
                    <div className="font-mono text-[0.65rem] text-[var(--color-text-dim)] text-center py-4">
                      Uyumlu anakart bulunamadı.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Right panel ── */}
            <div className="flex flex-col gap-4">

              {/* Processor select — always visible */}
              <div className="panel accent-top corner-brackets animate-fade-in-up stagger-2 p-6">
                <label className="font-mono flex items-center gap-1.5 text-[0.65rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-2">
                  <FontAwesomeIcon icon={faMicrochip} className="text-[0.6rem] text-[var(--color-cyan)]" />
                  İşlemci — {filtered.length} sonuç
                </label>
                <select value={selected?.id ?? ""} onChange={(e) => handleSelectById(e.target.value)} className="hx-input hx-select font-mono">
                  <option value="" disabled className="bg-[var(--color-bg-deep)]">— İşlemci seçin —</option>
                  {filtered.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[var(--color-bg-deep)] text-[var(--color-text-bright)]">
                      {p.brand} {p.model} — {p.socket} · {p.cores}C/{p.threads}T · {p.boostClock} GHz · {p.price.toLocaleString("tr-TR")} ₺
                    </option>
                  ))}
                </select>

                {/* Selected processor detail */}
                {selected && (
                  <div className="animate-fade-in mt-4 bg-[var(--color-bg-raised)] border border-[var(--color-cyan-dim)] border-l-2 border-l-[var(--color-cyan)] p-4">
                    <div className="flex items-center gap-3.5 mb-2.5">
                      <ProductImageBox imageUrl={selected.imageUrl} fallbackIcon={faMicrochip} alt={`${selected.brand} ${selected.model}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-body text-[0.9rem] font-semibold text-[var(--color-text-bright)]">{selected.brand} {selected.model}</div>
                        <div className="font-mono text-[0.58rem] text-[var(--color-cyan)] tracking-[0.08em]">{selected.series}</div>
                      </div>
                      <div className="font-display ml-auto text-[1.1rem] font-bold text-[var(--color-cyan)] shrink-0">
                        {selected.price.toLocaleString("tr-TR")} ₺
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "Soket", value: selected.socket },
                        { label: "Çekirdek", value: `${selected.cores}C / ${selected.threads}T` },
                        { label: "Saat Hızı", value: `${selected.baseClock} – ${selected.boostClock} GHz` },
                        { label: "TDP", value: `${selected.tdp}W` },
                        { label: "L3 Önbellek", value: `${selected.l3Cache} MB` },
                        { label: "Bellek", value: selected.memoryType },
                        { label: "iGPU", value: selected.integratedGraphics ? "Var" : "Yok" },
                      ].map(({ label, value }) => (
                        <SpecItem key={label} label={label} value={value} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Motherboard select — visible after processor selected */}
              {selected && (
                <div className="panel corner-brackets animate-fade-in p-6 border-t-2 border-t-[var(--color-cyan)]">
                  <label className="font-mono flex items-center gap-1.5 text-[0.65rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-2">
                    <FontAwesomeIcon icon={faServer} className="text-[0.6rem] text-[var(--color-cyan)]" />
                    Anakart — {filteredMotherboards.length} sonuç
                  </label>

                  {isMotherboardLoading ? (
                    <div className="flex items-center gap-2 py-3">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow text-[var(--color-cyan)] text-[0.85rem]" />
                      <span className="font-mono text-[0.7rem] tracking-[0.1em] text-[var(--color-text-muted)]">UYUMLU ANAKARTLAR YÜKLENİYOR...</span>
                    </div>
                  ) : (
                    <>
                      <select value={selectedMotherboard?.id ?? ""} onChange={(e) => handleMotherboardSelectById(e.target.value)} className="hx-input hx-select font-mono">
                        <option value="" disabled className="bg-[var(--color-bg-deep)]">— Anakart seçin —</option>
                        {filteredMotherboards.map((m) => (
                          <option key={m.id} value={m.id} className="bg-[var(--color-bg-deep)] text-[var(--color-text-bright)]">
                            {m.brand} {m.model} — {m.chipset} · {m.formFactor} · {m.ramSlots}x{m.supportedRamType}({m.maxRamGb}GB)
                          </option>
                        ))}
                      </select>

                      {/* Selected motherboard detail */}
                      {selectedMotherboard && (
                        <div className="animate-fade-in mt-4 bg-[var(--color-bg-raised)] border border-[var(--color-cyan-dim)] border-l-2 border-l-[var(--color-cyan)] p-4">
                          <div className="flex items-center gap-3.5 mb-2.5">
                            <ProductImageBox imageUrl={selectedMotherboard.imageUrl} fallbackIcon={faServer} alt={`${selectedMotherboard.brand} ${selectedMotherboard.model}`} />
                            <div className="flex-1 min-w-0">
                              <div className="font-body text-[0.9rem] font-semibold text-[var(--color-text-bright)]">{selectedMotherboard.brand} {selectedMotherboard.model}</div>
                              <div className="font-mono text-[0.58rem] text-[var(--color-cyan)] tracking-[0.08em]">{selectedMotherboard.chipset} · {selectedMotherboard.formFactor}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: "Soket", value: selectedMotherboard.socket },
                              { label: "Chipset", value: selectedMotherboard.chipset },
                              { label: "Form Faktörü", value: selectedMotherboard.formFactor },
                              { label: "RAM Slotları", value: `${selectedMotherboard.ramSlots} Slot` },
                              { label: "Maks RAM", value: `${selectedMotherboard.maxRamGb} GB` },
                              { label: "RAM Tipi", value: selectedMotherboard.supportedRamType },
                            ].map(({ label, value }) => (
                              <SpecItem key={label} label={label} value={value} />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Confirm */}
              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={!selected || !selectedMotherboard}
                  className="hx-btn-primary w-auto py-[10px] px-7 text-[0.78rem] tracking-[0.12em] flex items-center gap-2.5 rounded-none"
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

export default ProcessorSelect;
