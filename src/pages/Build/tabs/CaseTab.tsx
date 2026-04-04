import React from "react";
import { useCaseTab } from "../../../hooks/useCaseTab";
import ComponentCard from "../../../components/ui/ComponentCard";
import FilterPanel from "../../../components/ui/FilterPanel";

const CaseTab = () => {
  const { asyncState, filtered, filters, options, viewMode, setViewMode, setFilters, toggleArrayFilter, resetFilters, handleSelect, handleFinalize, isSubmitting, selectedId } = useCaseTab();
  if (asyncState.loading) return <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (asyncState.error) return <div className="h-64 flex items-center justify-center text-slate-500 text-sm">{asyncState.error}</div>;
  return (
    <div className="flex gap-6">
      <FilterPanel search={filters.search} onSearchChange={(v) => setFilters((f) => ({ ...f, search: v }))}
        sections={[
          { type: "checkbox", label: "Marka", options: options.brands, selected: filters.brands, onChange: (v) => toggleArrayFilter("brands", v) },
          { type: "checkbox", label: "Form Faktör", options: options.formFactors, selected: filters.formFactors, onChange: (v) => toggleArrayFilter("formFactors", v) },
        ]}
        onReset={resetFilters} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500"><strong className="text-slate-900">{filtered.length}</strong> kasa</span>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>☰ Liste</button>
            <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>⊞ Grid</button>
          </div>
        </div>
        <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
          {filtered.map((c) => (
            <ComponentCard key={c.id} id={c.id} brand={c.brand} model={c.model} imageUrl={c.imageUrl}
              isSelected={selectedId === c.id} mode={viewMode} onSelect={() => handleSelect(c)}
              specs={[{ label: "Form", value: c.formFactor }, { label: "Max GPU", value: `${c.maxGpuLengthMm}mm` }, { label: "Max Soğutucu", value: `${c.maxCoolerHeightMm}mm` }]} />
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleFinalize}
            disabled={!selectedId || isSubmitting}
            className="px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {isSubmitting ? "Kaydediliyor..." : "✓ Build'i Kaydet ve Bitir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseTab;
