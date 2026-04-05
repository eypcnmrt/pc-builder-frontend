import React from "react";
import { useGpuTab } from "../../../hooks/useGpuTab";
import { usePagination } from "../../../hooks/usePagination";
import ComponentCard from "../../../components/ui/ComponentCard";
import FilterPanel from "../../../components/ui/FilterPanel";
import SearchBar from "../../../components/ui/SearchBar";
import Pagination from "../../../components/ui/Pagination";

const GpuTab = () => {
  const { asyncState, filtered, filters, options, viewMode, sort, setSort, setViewMode, setFilters, toggleBrand, resetFilters, handleSelect, selectedId, searchInput, setSearchInput, onSearch } = useGpuTab();

  const { paginated, pagination } = usePagination(filtered, [filtered.length, filters.brands.join()]);

  if (asyncState.loading) return <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (asyncState.error) return <div className="h-64 flex items-center justify-center text-slate-500 text-sm">{asyncState.error}</div>;

  return (
    <div className="flex gap-6">
      <FilterPanel sections={[{ type: "checkbox", label: "Marka", options: options.brands, selected: filters.brands, onChange: toggleBrand, onApply: () => {} }]} onReset={resetFilters} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500"><strong className="text-slate-900">{filtered.length}</strong> ekran kartı</span>
          <div className="flex items-center gap-2">
            <SearchBar value={searchInput} onChange={setSearchInput} onSearch={onSearch} placeholder="GPU ara" />
            <select
              value={`${sort.field}|${sort.direction}`}
              onChange={(e) => { const [field, direction] = e.target.value.split("|"); setSort({ field: field as typeof sort.field, direction: direction as "asc" | "desc" }); }}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="memoryGb|desc">Bellek ↓</option>
              <option value="memoryGb|asc">Bellek ↑</option>
              <option value="boostClock|desc">Boost Hz ↓</option>
              <option value="boostClock|asc">Boost Hz ↑</option>
              <option value="tdp|asc">TDP ↑</option>
              <option value="tdp|desc">TDP ↓</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>☰ Liste</button>
              <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>⊞ Grid</button>
            </div>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Arama kriterlerine uygun ekran kartı bulunamadı.
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
              {paginated.map((g) => (
                <ComponentCard key={g.id} id={g.id} brand={g.brand} model={g.model} imageUrl={g.imageUrl}
                  isSelected={selectedId === g.id} mode={viewMode} onSelect={() => handleSelect(g)}
                  specs={[{ label: "VRAM", value: `${g.memoryGb}GB` }, { label: "Boost", value: `${g.boostClock} MHz` }, { label: "TDP", value: `${g.tdp}W` }]} />
              ))}
            </div>
            <Pagination pagination={pagination} label="ekran kartı" />
          </>
        )}
      </div>
    </div>
  );
};
export default GpuTab;
