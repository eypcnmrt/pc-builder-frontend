import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSpinner,
  faSearch,
  faRotateLeft,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { Layout } from "../../../components";
import useCaseSelect from "../../../hooks/useCaseSelect";
import type { PcCase } from "../../../types/build";

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

const CaseSelect = () => {
  const {
    filtered,
    isLoading,
    isSaving,
    selected,
    filters,
    options,
    motherboardFormFactor,
    isMatchingFormFactor,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    handleSelectById,
    handleConfirm,
  } = useCaseSelect();

  const renderOptionLabel = (item: PcCase) => {
    const match =
      motherboardFormFactor && isMatchingFormFactor(item) ? " [Eşleşiyor]" : "";
    return `${item.brand} ${item.model} — ${item.formFactor} · GPU: ${item.maxGpuLengthMm}mm · Soğutucu: ${item.maxCoolerHeightMm}mm${match}`;
  };

  return (
    <Layout>
      <div className="max-w-[1100px] mx-auto">
        <div className="animate-fade-in-down mb-6">
          <div className="font-mono text-[0.62rem] tracking-[0.2em] text-[var(--color-cyan)] uppercase mb-1">
            // ADIM 7 / 7 · BİLEŞEN SEÇİMİ
          </div>
          <h1 className="font-display text-[1.8rem] font-bold tracking-[0.04em] text-[var(--color-text-bright)] uppercase m-0 leading-[1.1]">
            Kasa{" "}
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

              {motherboardFormFactor && (
                <div className="mb-4 py-2 px-[10px] bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.3)]">
                  <div className="font-mono text-[0.58rem] tracking-[0.08em] text-[var(--color-text-dim)] uppercase mb-0.5">
                    Anakart Form Faktörü
                  </div>
                  <div className="font-display text-[0.85rem] font-bold text-[var(--color-cyan)]">
                    {motherboardFormFactor}
                  </div>
                  <div className="font-mono text-[0.55rem] text-[var(--color-text-dim)] mt-0.5">
                    Eşleşen kasalar listenin başına alındı
                  </div>
                </div>
              )}

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
                label="Form Faktörü"
                options={options.formFactors}
                selected={filters.formFactors}
                onToggle={(v) => toggleArrayFilter("formFactors", v)}
              />
            </div>

            {/* ── Right panel ── */}
            <div className="flex flex-col gap-4">
              <div className="panel accent-top corner-brackets animate-fade-in-up stagger-2 p-6">
                <label className="font-mono flex items-center gap-[6px] text-[0.65rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-2">
                  <FontAwesomeIcon icon={faBox} className="text-[0.6rem] text-[var(--color-cyan)]" />
                  Kasa — {filtered.length} sonuç
                </label>
                <select
                  value={selected?.id ?? ""}
                  onChange={(e) => handleSelectById(e.target.value)}
                  className="hx-input hx-select font-mono"
                >
                  <option value="" disabled style={{ background: "var(--color-bg-deep)" }}>
                    — Kasa seçin —
                  </option>
                  {filtered.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      style={{ background: "var(--color-bg-deep)", color: "var(--color-text-bright)" }}
                    >
                      {renderOptionLabel(item)}
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
                                icon={faBox}
                                className="text-[var(--color-cyan)] text-[1.8rem] [filter:drop-shadow(0_0_6px_rgba(6,182,212,0.8))]"
                              />
                            </div>
                          </>
                        ) : (
                          <FontAwesomeIcon
                            icon={faBox}
                            className="text-[var(--color-cyan)] text-[1.8rem] [filter:drop-shadow(0_0_6px_rgba(6,182,212,0.8))]"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-body text-[0.9rem] font-semibold text-[var(--color-text-bright)]">
                          {selected.brand} {selected.model}
                        </div>
                        <div
                          className={`font-mono text-[0.58rem] tracking-[0.08em] ${
                            motherboardFormFactor && isMatchingFormFactor(selected)
                              ? "text-[var(--color-cyan)]"
                              : "text-[var(--color-text-dim)]"
                          }`}
                        >
                          {selected.formFactor}
                          {motherboardFormFactor &&
                            (isMatchingFormFactor(selected)
                              ? " · Form Faktörü Eşleşiyor"
                              : " · Form Faktörü Farklı")}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Form Faktörü", value: selected.formFactor },
                        { label: "Maks GPU Uzunluğu", value: `${selected.maxGpuLengthMm} mm` },
                        { label: "Maks Soğutucu Yüksekliği", value: `${selected.maxCoolerHeightMm} mm` },
                      ].map(({ label, value }) => (
                        <SpecItem key={label} label={label} value={value} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={!selected || isSaving}
                  className="hx-btn-primary w-auto py-[10px] px-7 text-[0.78rem] tracking-[0.12em] flex items-center gap-[10px] rounded-none"
                >
                  {isSaving ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow text-[0.8rem]" />
                      <span>KAYDEDİLİYOR...</span>
                    </>
                  ) : (
                    <>
                      <span>TAMAMLA</span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-[0.8rem]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CaseSelect;
