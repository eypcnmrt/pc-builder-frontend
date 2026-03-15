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
  <div style={{ marginBottom: "1rem" }}>
    <span
      className="font-mono"
      style={{
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
        color: "var(--color-text-muted)",
        textTransform: "uppercase",
        display: "block",
        marginBottom: "6px",
      }}
    >
      {label}
    </span>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className="font-mono"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              padding: "3px 10px",
              background: active
                ? "rgba(6,182,212,0.15)"
                : "var(--color-bg-raised)",
              border: `1px solid ${
                active ? "var(--color-cyan)" : "var(--color-border-dim)"
              }`,
              color: active ? "var(--color-cyan)" : "var(--color-text-muted)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {opt}
          </button>
        );
      })}
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

  const renderOptionLabel = (item: PcCase) => {
    const match =
      motherboardFormFactor && isMatchingFormFactor(item) ? " [Eşleşiyor]" : "";
    return `${item.brand} ${item.model} — ${item.formFactor} · GPU: ${item.maxGpuLengthMm}mm · Soğutucu: ${item.maxCoolerHeightMm}mm${match}`;
  };

  return (
    <Layout>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="animate-fade-in-down" style={{ marginBottom: "1.5rem" }}>
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
            // ADIM 7 / 7 · BİLEŞEN SEÇİMİ
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--color-text-bright)",
              textTransform: "uppercase",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Kasa{" "}
            <span
              style={{
                color: "var(--color-cyan)",
                textShadow: "0 0 20px rgba(6,182,212,0.4)",
              }}
            >
              Seç
            </span>
          </h1>
        </div>

        {isLoading || !filters ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "4rem 0",
            }}
          >
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin-slow"
              style={{ color: "var(--color-cyan)" }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "var(--color-text-muted)",
              }}
            >
              YÜKLENİYOR...
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "1.5rem",
              alignItems: "start",
            }}
          >
            {/* ── Filters sidebar ── */}
            <div
              className="panel accent-top animate-fade-in-up"
              style={{ padding: "1.25rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--color-text-bright)",
                    textTransform: "uppercase",
                  }}
                >
                  Filtreler
                </span>
                <button
                  onClick={resetFilters}
                  className="font-mono"
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-dim)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRotateLeft}
                    style={{ fontSize: "0.55rem" }}
                  />{" "}
                  Sıfırla
                </button>
              </div>

              {motherboardFormFactor && (
                <div
                  style={{
                    marginBottom: "1rem",
                    padding: "8px 10px",
                    background: "rgba(6,182,212,0.08)",
                    border: "1px solid rgba(6,182,212,0.3)",
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.08em",
                      color: "var(--color-text-dim)",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                    }}
                  >
                    Anakart Form Faktörü
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--color-cyan)",
                    }}
                  >
                    {motherboardFormFactor}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.55rem",
                      color: "var(--color-text-dim)",
                      marginTop: "2px",
                    }}
                  >
                    Eşleşen kasalar listenin başına alındı
                  </div>
                </div>
              )}

              <div style={{ marginBottom: "1rem" }}>
                <div style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "0.65rem",
                      color: "var(--color-text-dim)",
                    }}
                  />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    placeholder="Ara..."
                    className="hx-input font-mono"
                    style={{
                      paddingLeft: "28px",
                      fontSize: "0.75rem",
                      borderRadius: "2px",
                    }}
                  />
                </div>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                className="panel accent-top corner-brackets animate-fade-in-up stagger-2"
                style={{ padding: "1.5rem" }}
              >
                <label
                  className="font-mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBox}
                    style={{ fontSize: "0.6rem", color: "var(--color-cyan)" }}
                  />
                  Kasa — {filtered.length} sonuç
                </label>
                <select
                  value={selected?.id ?? ""}
                  onChange={(e) => handleSelectById(e.target.value)}
                  className="hx-input font-mono"
                  style={dropdownStyle}
                >
                  <option
                    value=""
                    disabled
                    style={{ background: "var(--color-bg-deep)" }}
                  >
                    — Kasa seçin —
                  </option>
                  {filtered.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      style={{
                        background: "var(--color-bg-deep)",
                        color: "var(--color-text-bright)",
                      }}
                    >
                      {renderOptionLabel(item)}
                    </option>
                  ))}
                </select>

                {selected && (
                  <div
                    className="animate-fade-in"
                    style={{
                      marginTop: "1rem",
                      background: "var(--color-bg-raised)",
                      border: "1px solid var(--color-cyan-dim)",
                      borderLeft: "2px solid var(--color-cyan)",
                      padding: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "88px",
                          height: "88px",
                          flexShrink: 0,
                          background: "rgba(0,0,0,0.5)",
                          border: "1px solid rgba(6,182,212,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow: "inset 0 0 16px rgba(6,182,212,0.08)",
                        }}
                      >
                        {selected.imageUrl ? (
                          <>
                            <img
                              src={selected.imageUrl}
                              alt={`${selected.brand} ${selected.model}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                padding: "8px",
                              }}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display =
                                  "none";
                                (
                                  e.currentTarget
                                    .nextSibling as HTMLElement
                                ).style.display = "flex";
                              }}
                            />
                            <div
                              style={{
                                display: "none",
                                position: "absolute",
                                inset: 0,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faBox}
                                style={{
                                  color: "var(--color-cyan)",
                                  fontSize: "1.8rem",
                                  filter:
                                    "drop-shadow(0 0 6px rgba(6,182,212,0.8))",
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <FontAwesomeIcon
                            icon={faBox}
                            style={{
                              color: "var(--color-cyan)",
                              fontSize: "1.8rem",
                              filter:
                                "drop-shadow(0 0 6px rgba(6,182,212,0.8))",
                            }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          className="font-body"
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "var(--color-text-bright)",
                          }}
                        >
                          {selected.brand} {selected.model}
                        </div>
                        <div
                          className="font-mono"
                          style={{
                            fontSize: "0.58rem",
                            color:
                              motherboardFormFactor &&
                              isMatchingFormFactor(selected)
                                ? "var(--color-cyan)"
                                : "var(--color-text-dim)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {selected.formFactor}
                          {motherboardFormFactor &&
                            (isMatchingFormFactor(selected)
                              ? " · Form Faktörü Eşleşiyor"
                              : " · Form Faktörü Farklı")}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "8px",
                      }}
                    >
                      {[
                        { label: "Form Faktörü", value: selected.formFactor },
                        {
                          label: "Maks GPU Uzunluğu",
                          value: `${selected.maxGpuLengthMm} mm`,
                        },
                        {
                          label: "Maks Soğutucu Yüksekliği",
                          value: `${selected.maxCoolerHeightMm} mm`,
                        },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          style={{
                            background: "var(--color-bg-elevated)",
                            border: "1px solid var(--color-border-dim)",
                            padding: "6px 8px",
                          }}
                        >
                          <div
                            className="font-mono"
                            style={{
                              fontSize: "0.52rem",
                              letterSpacing: "0.1em",
                              color: "var(--color-text-dim)",
                              textTransform: "uppercase",
                              marginBottom: "2px",
                            }}
                          >
                            {label}
                          </div>
                          <div
                            className="font-body"
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--color-text-primary)",
                              fontWeight: 500,
                            }}
                          >
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleConfirm}
                  disabled={!selected || isSaving}
                  className="hx-btn-primary"
                  style={{
                    width: "auto",
                    padding: "10px 28px",
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "0",
                  }}
                >
                  {isSaving ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" style={{ fontSize: "0.8rem" }} />
                      <span>KAYDEDİLİYOR...</span>
                    </>
                  ) : (
                    <>
                      <span>TAMAMLA</span>
                      <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem" }} />
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
