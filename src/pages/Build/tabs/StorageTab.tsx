import React from "react";
import { useStorageTab } from "../../../hooks/useStorageTab";
import ComponentCard from "../../../components/ui/ComponentCard";
import FilterPanel from "../../../components/ui/FilterPanel";
import SearchBar from "../../../components/ui/SearchBar";

const StorageTab = () => {
  const { asyncState, filtered, filters, options, viewMode, sort, setSort, setViewMode, setFilters, toggleArrayFilter, resetFilters, handleSelect, selectedId, searchInput, setSearchInput, onSearch } = useStorageTab();
  if (asyncState.loading) return <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (asyncState.error) return <div className="h-64 flex items-center justify-center text-slate-500 text-sm">{asyncState.error}</div>;
  return (
    <div className="flex gap-6">
      <FilterPanel
        sections={[
          { type: "checkbox", label: "Marka", options: options.brands, selected: filters.brands, onChange: (v) => toggleArrayFilter("brands", v) },
          { type: "checkbox", label: "Tip", options: options.types, selected: filters.types, onChange: (v) => toggleArrayFilter("types", v) },
        ]}
        onReset={resetFilters} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500"><strong className="text-slate-900">{filtered.length}</strong> depolama</span>
          <div className="flex items-center gap-2">
            <SearchBar value={searchInput} onChange={setSearchInput} onSearch={onSearch} />
            <select
              value={`${sort.field}|${sort.direction}`}
              onChange={(e) => { const [field, direction] = e.target.value.split("|"); setSort({ field: field as typeof sort.field, direction: direction as "asc" | "desc" }); }}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="capacityGb|desc">Kapasite ↓</option>
              <option value="capacityGb|asc">Kapasite ↑</option>
              <option value="readSpeedMbs|desc">Okuma Hızı ↓</option>
              <option value="readSpeedMbs|asc">Okuma Hızı ↑</option>
              <option value="writeSpeedMbs|desc">Yazma Hızı ↓</option>
              <option value="writeSpeedMbs|asc">Yazma Hızı ↑</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>☰ Liste</button>
              <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>⊞ Grid</button>
            </div>
          </div>
        </div>
        <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
          {filtered.map((s) => (
            <ComponentCard key={s.id} id={s.id} brand={s.brand} model={s.model} imageUrl={s.imageUrl}
              isSelected={selectedId === s.id} mode={viewMode} onSelect={() => handleSelect(s)}
              specs={[{ label: "Tip", value: s.type }, { label: "Kapasite", value: `${s.capacityGb}GB` }, { label: "Arayüz", value: s.interface }]} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default StorageTab;
