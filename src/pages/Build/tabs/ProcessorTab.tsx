import React from "react";
import { useProcessorTab } from "../../../hooks/useProcessorTab";
import { usePagination } from "../../../hooks/usePagination";
import ComponentCard from "../../../components/ui/ComponentCard";
import FilterPanel from "../../../components/ui/FilterPanel";
import SearchBar from "../../../components/ui/SearchBar";
import Pagination from "../../../components/ui/Pagination";
import type { FilterPanelSection, FilterPanelRange } from "../../../components/ui/FilterPanel";

const ProcessorTab = () => {
  const {
    asyncState, filtered, pendingFilters, setPendingFilters, options, viewMode, sort, setSort,
    setViewMode, togglePendingBrand, togglePendingSocket, togglePendingSeries, togglePendingBoostClock,
    applyPriceFilter, applyBrandsFilter, applySocketsFilter, applySeriesFilter, applyBoostClocksFilter,
    resetFilters, handleSelect, selectedId,
    searchInput, setSearchInput, onSearch,
  } = useProcessorTab();

  const { paginated, pagination } = usePagination(filtered, [
    filtered.length,
    pendingFilters.brands.join(),
    pendingFilters.sockets.join(),
    pendingFilters.series.join(),
    pendingFilters.boostClocks.join(),
    pendingFilters.priceMin,
    pendingFilters.priceMax,
  ]);

  if (asyncState.loading) {
    return (
      <div className="flex gap-6">
        <div className="w-56 h-96 bg-slate-100 rounded-xl animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (asyncState.error) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        <div className="text-center">
          <p className="mb-3">{asyncState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            Yenile
          </button>
        </div>
      </div>
    );
  }

  const filterSections: (FilterPanelSection | FilterPanelRange)[] = [
    {
      type: "range",
      label: "Fiyat Aralığı",
      min: options.minPrice,
      max: options.maxPrice,
      value: [pendingFilters.priceMin, pendingFilters.priceMax],
      onChange: ([min, max]) => setPendingFilters((f) => ({ ...f, priceMin: min, priceMax: max })),
      onApply: applyPriceFilter,
      unit: "₺",
    },
    {
      type: "checkbox",
      label: "İşlemci Serisi",
      options: options.series,
      selected: pendingFilters.series,
      onChange: togglePendingSeries,
      onApply: applySeriesFilter,
    },
    {
      type: "checkbox",
      label: "İşlemci Soket Tipi",
      options: options.sockets,
      selected: pendingFilters.sockets,
      onChange: togglePendingSocket,
      onApply: applySocketsFilter,
    },
    {
      type: "checkbox",
      label: "Frekans Hızı",
      options: options.boostClocks.map((v) => `${v.toFixed(1)} GHz`),
      selected: pendingFilters.boostClocks.map((v) => `${v.toFixed(1)} GHz`),
      onChange: togglePendingBoostClock,
      onApply: applyBoostClocksFilter,
    },
    {
      type: "checkbox",
      label: "Marka",
      options: options.brands,
      selected: pendingFilters.brands,
      onChange: togglePendingBrand,
      onApply: applyBrandsFilter,
    },
  ];

  return (
    <div className="flex gap-6">
      <FilterPanel sections={filterSections} onReset={resetFilters} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">
            <strong className="text-slate-900">{filtered.length}</strong> işlemci
          </span>
          <div className="flex items-center gap-2">
            <SearchBar value={searchInput} onChange={setSearchInput} onSearch={onSearch} placeholder="İşlemci ara" />
            <select
              value={`${sort.field}|${sort.direction}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split("|");
                setSort({ field: field as typeof sort.field, direction: direction as "asc" | "desc" });
              }}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="price|asc">Fiyat ↑</option>
              <option value="price|desc">Fiyat ↓</option>
              <option value="cores|desc">Çekirdek ↓</option>
              <option value="cores|asc">Çekirdek ↑</option>
              <option value="boostClock|desc">Boost Hz ↓</option>
              <option value="boostClock|asc">Boost Hz ↑</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                ☰ Liste
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                ⊞ Grid
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Arama kriterlerine uygun işlemci bulunamadı.
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
              {paginated.map((p) => (
                <ComponentCard
                  key={p.id}
                  id={p.id}
                  brand={p.brand}
                  model={p.model}
                  imageUrl={p.imageUrl}
                  price={p.price}
                  isSelected={selectedId === p.id}
                  mode={viewMode}
                  onSelect={() => handleSelect(p)}
                  specs={[
                    { label: "Soket", value: p.socket },
                    { label: "Çekirdek", value: `${p.cores}C/${p.threads}T` },
                    { label: "TDP", value: `${p.tdp}W` },
                    { label: "Boost", value: `${p.boostClock} GHz` },
                  ]}
                />
              ))}
            </div>
            <Pagination pagination={pagination} label="işlemci" />
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessorTab;
