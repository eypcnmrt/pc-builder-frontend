import React from "react";
import { usePsuTab } from "../../../hooks/usePsuTab";
import { usePagination } from "../../../hooks/usePagination";
import ComponentCard from "../../../components/ui/ComponentCard";
import FilterPanel from "../../../components/ui/FilterPanel";
import SearchBar from "../../../components/ui/SearchBar";
import Pagination from "../../../components/ui/Pagination";

const PsuTab = () => {
  const { asyncState, filtered, filters, options, viewMode, sort, setSort, setViewMode, setFilters, toggleBrand, resetFilters, handleSelect, selectedId, searchInput, setSearchInput, onSearch } = usePsuTab();

  const { paginated, pagination } = usePagination(filtered, [filtered.length, filters.brands.join()]);

  if (asyncState.loading) return <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (asyncState.error) return <div className="h-64 flex items-center justify-center text-slate-500 text-sm">{asyncState.error}</div>;

  return (
    <div className="flex gap-6">
      <FilterPanel sections={[{ type: "checkbox", label: "Marka", options: options.brands, selected: filters.brands, onChange: toggleBrand, onApply: () => {} }]} onReset={resetFilters} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500"><strong className="text-slate-900">{filtered.length}</strong> güç kaynağı</span>
          <div className="flex items-center gap-2">
            <SearchBar value={searchInput} onChange={setSearchInput} onSearch={onSearch} placeholder="Güç kaynağı ara" />
            <select
              value={`${sort.field}|${sort.direction}`}
              onChange={(e) => { const [field, direction] = e.target.value.split("|"); setSort({ field: field as typeof sort.field, direction: direction as "asc" | "desc" }); }}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="wattage|desc">Watt ↓</option>
              <option value="wattage|asc">Watt ↑</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>☰ Liste</button>
              <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 text-xs font-medium ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>⊞ Grid</button>
            </div>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Arama kriterlerine uygun güç kaynağı bulunamadı.
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
              {paginated.map((p) => (
                <ComponentCard key={p.id} id={p.id} brand={p.brand} model={p.model} imageUrl={p.imageUrl}
                  isSelected={selectedId === p.id} mode={viewMode} onSelect={() => handleSelect(p)}
                  specs={[{ label: "Watt", value: `${p.wattage}W` }, { label: "Verim", value: p.efficiencyRating }, { label: "Modüler", value: p.modular }]} />
              ))}
            </div>
            <Pagination pagination={pagination} label="güç kaynağı" />
          </>
        )}
      </div>
    </div>
  );
};

export default PsuTab;
