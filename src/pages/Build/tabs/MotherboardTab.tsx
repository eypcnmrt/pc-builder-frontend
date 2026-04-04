import React from "react";
import { useMotherboardTab } from "../../../hooks/useMotherboardTab";
import ComponentCard from "../../../components/ui/ComponentCard";
import FilterPanel from "../../../components/ui/FilterPanel";
import type { FilterPanelSection } from "../../../components/ui/FilterPanel";

const MotherboardTab = () => {
  const {
    asyncState,
    filtered,
    filters,
    options,
    viewMode,
    setViewMode,
    setFilters,
    toggleArrayFilter,
    resetFilters,
    handleSelect,
    selectedId,
    processorSocket,
  } = useMotherboardTab();

  if (asyncState.loading) {
    return (
      <div className="flex gap-6">
        <div className="w-56 h-96 bg-slate-100 rounded-xl animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (asyncState.error) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
        {asyncState.error}
      </div>
    );
  }

  const sections: FilterPanelSection[] = [
    {
      type: "checkbox",
      label: "Marka",
      options: options.brands,
      selected: filters.brands,
      onChange: (v) => toggleArrayFilter("brands", v),
    },
    {
      type: "checkbox",
      label: "Chipset",
      options: options.chipsets,
      selected: filters.chipsets,
      onChange: (v) => toggleArrayFilter("chipsets", v),
    },
    {
      type: "checkbox",
      label: "Form Faktör",
      options: options.formFactors,
      selected: filters.formFactors,
      onChange: (v) => toggleArrayFilter("formFactors", v),
    },
  ];

  return (
    <div className="flex gap-6">
      <FilterPanel
        search={filters.search}
        onSearchChange={(v) => setFilters((f) => ({ ...f, search: v }))}
        sections={sections}
        onReset={resetFilters}
      />
      <div className="flex-1 min-w-0">
        {processorSocket ? (
          <div className="mb-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            Seçili işlemci soketi: <strong>{processorSocket}</strong> — uyumlu anakartlar listeleniyor.
          </div>
        ) : (
          <div className="mb-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
            ⚠ İşlemci seçilmedi — tüm anakartlar listeleniyor.
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">
            <strong className="text-slate-900">{filtered.length}</strong> anakart
          </span>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              ☰ Liste
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              ⊞ Grid
            </button>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Uyumlu anakart bulunamadı.
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
            {filtered.map((m) => (
              <ComponentCard
                key={m.id}
                id={m.id}
                brand={m.brand}
                model={m.model}
                imageUrl={m.imageUrl}
                price={m.price}
                isSelected={selectedId === m.id}
                mode={viewMode}
                onSelect={() => handleSelect(m)}
                specs={[
                  { label: "Soket", value: m.socket },
                  { label: "Chipset", value: m.chipset },
                  { label: "Form", value: m.formFactor },
                  { label: "DDR", value: m.supportedRamType },
                ]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MotherboardTab;
