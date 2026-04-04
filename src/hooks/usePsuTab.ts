import { useState, useEffect, useMemo } from "react";
import { fetchPsus } from "../service/psu";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { PSU } from "../types/build";

interface PsuFilters { search: string; brands: string[]; }
const DEFAULT_FILTERS: PsuFilters = { search: "", brands: [] };

export const usePsuTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<PSU[]>>(asyncLoading());
  const [filters, setFilters] = useState<PsuFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    const load = async () => {
      const r = await fetchPsus(1, 200);
      if (!r) { setAsyncState(asyncError("Güç kaynakları yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(r.items));
    };
    load();
  }, []);

  const options = useMemo(() => ({ brands: [...new Set((asyncState.data ?? []).map((p) => p.brand))].sort() }), [asyncState.data]);

  const filtered = useMemo(() => (asyncState.data ?? []).filter((p) => {
    if (filters.search && !`${p.brand} ${p.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    return true;
  }), [asyncState.data, filters]);

  const handleSelect = (p: PSU) => { setComponent("psuId", p.id); toast.success(`${p.brand} ${p.model} seçildi`); };

  return {
    asyncState, filtered, filters, options, viewMode, setViewMode, setFilters,
    toggleBrand: (v: string) => setFilters((f) => ({ ...f, brands: f.brands.includes(v) ? f.brands.filter((b) => b !== v) : [...f.brands, v] })),
    resetFilters: () => setFilters(DEFAULT_FILTERS), handleSelect, selectedId: state.psuId,
  };
};
