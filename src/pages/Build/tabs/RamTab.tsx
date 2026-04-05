import React from "react";
import { useRamTab } from "../../../hooks/useRamTab";
import { usePagination } from "../../../hooks/usePagination";
import ComponentCard from "../../../components/ui/ComponentCard";
import FilterPanel from "../../../components/ui/FilterPanel";
import SearchBar from "../../../components/ui/SearchBar";
import Pagination from "../../../components/ui/Pagination";

const RamTab = () => {
  const { asyncState, filtered, filters, options, viewMode, sort, setSort, setViewMode, setFilters, toggleArrayFilter, resetFilters, handleSelect, selectedId, ramTypeFilter, searchInput, setSearchInput, onSearch } = useRamTab();

  const { paginated, pagination } = usePagination(filtered, [filtered.length, filters.brands.join(), filters.types.join()]);

  if (asyncState.loading) return <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (asyncState.error) return <div className="h-64 flex items-center justify-center text-slate-500 text-sm">{asyncState.error}</div>;

  return (
    <div className="flex gap-6">
      <FilterPanel
        sections={[
          { type: "checkbox", label: "Marka", options: options.brands, selected: filters.brands, onChange: (v) => toggleArrayFilter("brands", v), onApply: () => {} },
          { type: "checkbox", label: "DDR Tipi", options: options.types, selected: filters.types, onChange: (v) => toggleArrayFilter("types", v), onApply: () => {} },
        ]}
        onReset={resetFilters} />
      <div className="flex-1 min-w-0">
        {ramTypeFilter && (
          <div className="mb-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            Anakart desteklediği tip: <strong>{ramTypeFilter}</strong>
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500"><strong className="text-slate-900">{filtered.length}</strong> RAM</span>
          <div className="flex items-center gap-2">
            <SearchBar value={searchInput} onChange={setSearchInput} onSearch={onSearch} placeholder="RAM ara" />
            <select
              value={`${sort.field}|${sort.direction}`}
              onChange={(e) => { const [field, direction] = e.target.value.split("|"); setSort({ field: field as typeof sort.field, direction: direction as "asc" | "desc" }); }}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="capacityGb|desc">Kapasite ↓</option>
              <option value="capacityGb|asc">Kapasite ↑</option>
              <option value="speedMhz|desc">Hız ↓</option>
              <option value="speedMhz|asc">Hız ↑</option>
              <option value="latencyCl|asc">Gecikme ↑</option>
              <option value="latencyCl|desc">Gecikme ↓</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>☰ Liste</button>
              <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>⊞ Grid</button>
            </div>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Arama kriterlerine uygun RAM bulunamadı.
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
              {paginated.map((r) => (
                <ComponentCard key={r.id} id={r.id} brand={r.brand} model={r.model} imageUrl={r.imageUrl}
                  isSelected={selectedId === r.id} mode={viewMode} onSelect={() => handleSelect(r)}
                  specs={[{ label: "Tip", value: r.type }, { label: "Kapasite", value: `${r.capacityGb}GB` }, { label: "Hız", value: `${r.speedMhz} MHz` }]} />
              ))}
            </div>
            <Pagination pagination={pagination} label="RAM" />
          </>
        )}
      </div>
    </div>
  );
};
export default RamTab;
