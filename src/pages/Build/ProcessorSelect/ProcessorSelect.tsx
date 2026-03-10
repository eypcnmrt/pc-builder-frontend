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
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--color-text-muted)", textTransform: "uppercase" }}>{label}</span>
        <span className="font-mono" style={{ fontSize: "0.62rem", color: "var(--color-cyan)" }}>
          {fmt(value[0])} — {fmt(value[1])}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <input type="range" min={min} max={max} value={value[0]}
          onChange={(e) => { const v = Number(e.target.value); if (v <= value[1]) onChange([v, value[1]]); }}
          style={{ width: "100%", accentColor: "var(--color-cyan)", height: "3px" }} />
        <input type="range" min={min} max={max} value={value[1]}
          onChange={(e) => { const v = Number(e.target.value); if (v >= value[0]) onChange([value[0], v]); }}
          style={{ width: "100%", accentColor: "var(--color-cyan)", height: "3px" }} />
      </div>
    </div>
  );
};

/* ── Checkbox group ──────────────────────────────────────────────────────── */
const CheckGroup = ({ label, options, selected, onToggle }: {
  label: string; options: string[]; selected: string[]; onToggle: (v: string) => void;
}) => (
  <div style={{ marginBottom: "1rem" }}>
    <span className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{label}</span>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button key={opt} onClick={() => onToggle(opt)} className="font-mono"
            style={{
              fontSize: "0.6rem", letterSpacing: "0.08em", padding: "3px 10px",
              background: active ? "rgba(6,182,212,0.15)" : "var(--color-bg-raised)",
              border: `1px solid ${active ? "var(--color-cyan)" : "var(--color-border-dim)"}`,
              color: active ? "var(--color-cyan)" : "var(--color-text-muted)",
              cursor: "pointer", transition: "all 0.15s",
            }}>
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
  <div style={{ marginBottom: "1rem" }}>
    <span className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{label}</span>
    <div style={{ display: "flex", gap: "6px" }}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button key={opt.value} onClick={() => onChange(opt.value)} className="font-mono"
            style={{
              fontSize: "0.6rem", letterSpacing: "0.08em", padding: "3px 12px",
              background: active ? "rgba(6,182,212,0.15)" : "var(--color-bg-raised)",
              border: `1px solid ${active ? "var(--color-cyan)" : "var(--color-border-dim)"}`,
              color: active ? "var(--color-cyan)" : "var(--color-text-muted)",
              cursor: "pointer", transition: "all 0.15s",
            }}>
            {opt.label}
          </button>
        );
      })}
    </div>
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

  const dropdownStyle: React.CSSProperties = {
    borderRadius: "2px",
    fontSize: "0.78rem",
    cursor: "pointer",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2306b6d4' stroke-width='1.5' fill='none' stroke-linecap='square'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "2.5rem",
  };

  return (
    <Layout>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div className="animate-fade-in-down" style={{ marginBottom: "1.5rem" }}>
          <div className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--color-cyan)", textTransform: "uppercase", marginBottom: "4px" }}>
            // ADIM 1 / 8 · BİLEŞEN SEÇİMİ
          </div>
          <h1 className="font-display" style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "0.04em", color: "var(--color-text-bright)", textTransform: "uppercase", margin: 0, lineHeight: 1.1 }}>
            İşlemci <span style={{ color: "var(--color-cyan)", textShadow: "0 0 20px rgba(6,182,212,0.4)" }}>Seç</span>
          </h1>
        </div>

        {isLoading || !filters ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "4rem 0" }}>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" style={{ color: "var(--color-cyan)" }} />
            <span className="font-mono" style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--color-text-muted)" }}>YÜKLENİYOR...</span>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1.5rem", alignItems: "start" }}>

            {/* ── Filters sidebar ── */}
            <div className="panel accent-top animate-fade-in-up" style={{ padding: "1.25rem" }}>

              {/* Processor filters */}
              {!selected && (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <span className="font-display" style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", color: "var(--color-text-bright)", textTransform: "uppercase" }}>Filtreler</span>
                    <button onClick={resetFilters} className="font-mono"
                      style={{ fontSize: "0.58rem", letterSpacing: "0.08em", color: "var(--color-text-dim)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FontAwesomeIcon icon={faRotateLeft} style={{ fontSize: "0.55rem" }} /> Sıfırla
                    </button>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faSearch} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "0.65rem", color: "var(--color-text-dim)" }} />
                      <input type="text" value={filters.search} onChange={(e) => updateFilter("search", e.target.value)}
                        placeholder="Ara..." className="hx-input font-mono"
                        style={{ paddingLeft: "28px", fontSize: "0.75rem", borderRadius: "2px" }} />
                    </div>
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
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <div>
                      <span className="font-display" style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", color: "var(--color-text-bright)", textTransform: "uppercase" }}>Anakart</span>
                      <div className="font-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.08em", color: "var(--color-cyan)", marginTop: "2px" }}>Filtreler</div>
                    </div>
                    <button onClick={resetMotherboardFilters} className="font-mono"
                      style={{ fontSize: "0.58rem", letterSpacing: "0.08em", color: "var(--color-text-dim)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FontAwesomeIcon icon={faRotateLeft} style={{ fontSize: "0.55rem" }} /> Sıfırla
                    </button>
                  </div>

                  {motherboardFilters && (
                    <>
                      <div style={{ marginBottom: "1rem" }}>
                        <div style={{ position: "relative" }}>
                          <FontAwesomeIcon icon={faSearch} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "0.65rem", color: "var(--color-text-dim)" }} />
                          <input type="text" value={motherboardFilters.search} onChange={(e) => updateMotherboardFilter("search", e.target.value)}
                            placeholder="Ara..." className="hx-input font-mono"
                            style={{ paddingLeft: "28px", fontSize: "0.75rem", borderRadius: "2px" }} />
                        </div>
                      </div>

                      <CheckGroup label="Marka" options={motherboardOptions.brands} selected={motherboardFilters.brands} onToggle={(v) => toggleMotherboardArrayFilter("brands", v)} />
                      <CheckGroup label="Chipset" options={motherboardOptions.chipsets} selected={motherboardFilters.chipsets} onToggle={(v) => toggleMotherboardArrayFilter("chipsets", v)} />
                      <CheckGroup label="Form Faktörü" options={motherboardOptions.formFactors} selected={motherboardFilters.formFactors} onToggle={(v) => toggleMotherboardArrayFilter("formFactors", v)} />
                      <CheckGroup label="RAM Tipi" options={motherboardOptions.supportedRamTypes} selected={motherboardFilters.supportedRamTypes} onToggle={(v) => toggleMotherboardArrayFilter("supportedRamTypes", v)} />
                      <RangeRow
                        label="RAM Slot Sayısı"
                        min={motherboardOptions.minRamSlots}
                        max={motherboardOptions.maxRamSlots}
                        value={motherboardFilters.ramSlotsRange}
                        onChange={(v) => updateMotherboardFilter("ramSlotsRange", v)}
                      />
                      <RangeRow
                        label="Maks RAM (GB)"
                        min={motherboardOptions.minMaxRam}
                        max={motherboardOptions.maxMaxRam}
                        value={motherboardFilters.maxRamRange}
                        onChange={(v) => updateMotherboardFilter("maxRamRange", v)}
                        format={(n) => `${n} GB`}
                      />
                    </>
                  )}

                  {!motherboardFilters && !isMotherboardLoading && (
                    <div className="font-mono" style={{ fontSize: "0.65rem", color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>
                      Uyumlu anakart bulunamadı.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Right panel ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Processor select — always visible */}
              <div className="panel accent-top corner-brackets animate-fade-in-up stagger-2" style={{ padding: "1.5rem" }}>
                <label className="font-mono" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                  <FontAwesomeIcon icon={faMicrochip} style={{ fontSize: "0.6rem", color: "var(--color-cyan)" }} />
                  İşlemci — {filtered.length} sonuç
                </label>
                <select value={selected?.id ?? ""} onChange={(e) => handleSelectById(e.target.value)} className="hx-input font-mono" style={dropdownStyle}>
                  <option value="" disabled style={{ background: "var(--color-bg-deep)" }}>— İşlemci seçin —</option>
                  {filtered.map((p) => (
                    <option key={p.id} value={p.id} style={{ background: "var(--color-bg-deep)", color: "var(--color-text-bright)" }}>
                      {p.brand} {p.model} — {p.socket} · {p.cores}C/{p.threads}T · {p.boostClock} GHz · {p.price.toLocaleString("tr-TR")} ₺
                    </option>
                  ))}
                </select>

                {/* Selected processor detail */}
                {selected && (
                  <div className="animate-fade-in" style={{ marginTop: "1rem", background: "var(--color-bg-raised)", border: "1px solid var(--color-cyan-dim)", borderLeft: "2px solid var(--color-cyan)", padding: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                      <FontAwesomeIcon icon={faMicrochip} style={{ color: "var(--color-cyan)", fontSize: "1.1rem", filter: "drop-shadow(0 0 4px rgba(6,182,212,0.8))" }} />
                      <div>
                        <div className="font-body" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text-bright)" }}>{selected.brand} {selected.model}</div>
                        <div className="font-mono" style={{ fontSize: "0.58rem", color: "var(--color-cyan)", letterSpacing: "0.08em" }}>{selected.series} · {selected.architecture}</div>
                      </div>
                      <div className="font-display" style={{ marginLeft: "auto", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-cyan)" }}>
                        {selected.price.toLocaleString("tr-TR")} ₺
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                      {[
                        { label: "Soket", value: selected.socket },
                        { label: "Çekirdek", value: `${selected.cores}C / ${selected.threads}T` },
                        { label: "Saat Hızı", value: `${selected.baseClock} – ${selected.boostClock} GHz` },
                        { label: "TDP", value: `${selected.tdp}W` },
                        { label: "L3 Önbellek", value: `${selected.l3Cache} MB` },
                        { label: "Bellek", value: selected.memoryType },
                        { label: "iGPU", value: selected.integratedGraphics ? "Var" : "Yok" },
                        { label: "Mimari", value: selected.architecture },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-dim)", padding: "6px 8px" }}>
                          <div className="font-mono" style={{ fontSize: "0.52rem", letterSpacing: "0.1em", color: "var(--color-text-dim)", textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
                          <div className="font-body" style={{ fontSize: "0.75rem", color: "var(--color-text-primary)", fontWeight: 500 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Motherboard select — visible after processor selected */}
              {selected && (
                <div className="panel corner-brackets animate-fade-in" style={{ padding: "1.5rem", borderTop: "2px solid var(--color-cyan)" }}>
                  <label className="font-mono" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                    <FontAwesomeIcon icon={faServer} style={{ fontSize: "0.6rem", color: "var(--color-cyan)" }} />
                    Anakart — {filteredMotherboards.length} sonuç
                  </label>

                  {isMotherboardLoading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.75rem 0" }}>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" style={{ color: "var(--color-cyan)", fontSize: "0.85rem" }} />
                      <span className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--color-text-muted)" }}>UYUMLU ANAKARTLAR YÜKLENİYOR...</span>
                    </div>
                  ) : (
                    <>
                      <select
                        value={selectedMotherboard?.id ?? ""}
                        onChange={(e) => handleMotherboardSelectById(e.target.value)}
                        className="hx-input font-mono"
                        style={dropdownStyle}
                      >
                        <option value="" disabled style={{ background: "var(--color-bg-deep)" }}>— Anakart seçin —</option>
                        {filteredMotherboards.map((m) => (
                          <option key={m.id} value={m.id} style={{ background: "var(--color-bg-deep)", color: "var(--color-text-bright)" }}>
                            {m.brand} {m.model} — {m.chipset} · {m.formFactor} · {m.ramSlots}x{m.supportedRamType}({m.maxRamGb}GB)
                          </option>
                        ))}
                      </select>

                      {/* Selected motherboard detail */}
                      {selectedMotherboard && (
                        <div className="animate-fade-in" style={{ marginTop: "1rem", background: "var(--color-bg-raised)", border: "1px solid var(--color-cyan-dim)", borderLeft: "2px solid var(--color-cyan)", padding: "1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <FontAwesomeIcon icon={faServer} style={{ color: "var(--color-cyan)", fontSize: "1.1rem", filter: "drop-shadow(0 0 4px rgba(6,182,212,0.8))" }} />
                            <div>
                              <div className="font-body" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text-bright)" }}>{selectedMotherboard.brand} {selectedMotherboard.model}</div>
                              <div className="font-mono" style={{ fontSize: "0.58rem", color: "var(--color-cyan)", letterSpacing: "0.08em" }}>{selectedMotherboard.chipset} · {selectedMotherboard.formFactor}</div>
                            </div>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                            {[
                              { label: "Soket", value: selectedMotherboard.socket },
                              { label: "Chipset", value: selectedMotherboard.chipset },
                              { label: "Form Faktörü", value: selectedMotherboard.formFactor },
                              { label: "RAM Slotları", value: `${selectedMotherboard.ramSlots} Slot` },
                              { label: "Maks RAM", value: `${selectedMotherboard.maxRamGb} GB` },
                              { label: "RAM Tipi", value: selectedMotherboard.supportedRamType },
                            ].map(({ label, value }) => (
                              <div key={label} style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-dim)", padding: "6px 8px" }}>
                                <div className="font-mono" style={{ fontSize: "0.52rem", letterSpacing: "0.1em", color: "var(--color-text-dim)", textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
                                <div className="font-body" style={{ fontSize: "0.75rem", color: "var(--color-text-primary)", fontWeight: 500 }}>{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Confirm */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleConfirm}
                  disabled={!selected || !selectedMotherboard}
                  className="hx-btn-primary"
                  style={{ width: "auto", padding: "10px 28px", fontSize: "0.78rem", letterSpacing: "0.12em", display: "flex", alignItems: "center", gap: "10px", borderRadius: "0" }}
                >
                  <span>DEVAM ET</span>
                  <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem" }} />
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
