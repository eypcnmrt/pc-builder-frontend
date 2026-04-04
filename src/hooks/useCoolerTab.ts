import { useState, useEffect, useMemo } from "react";
import { fetchCoolers } from "../service/cooler";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Cooler } from "../types/build";

interface CoolerFilters { search: string; brands: string[]; types: string[]; }
const DEFAULT_FILTERS: CoolerFilters = { search: "", brands: [], types: [] };

export const useCoolerTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<Cooler[]>>(asyncLoading());
  const [filters, setFilters] = useState<CoolerFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    fetchCoolers(1, 200).then((r) => {
      if (!r) { setAsyncState(asyncError("Soğutucular yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(r.items));
    });
  }, []);

  const options = useMemo(() => ({
    brands: [...new Set((asyncState.data ?? []).map((c) => c.brand))].sort(),
    types: [...new Set((asyncState.data ?? []).map((c) => c.type))].sort(),
  }), [asyncState.data]);

  const filtered = useMemo(() => (asyncState.data ?? []).filter((c) => {
    if (filters.search && !`${c.brand} ${c.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.brands.length && !filters.brands.includes(c.brand)) return false;
    if (filters.types.length && !filters.types.includes(c.type)) return false;
    return true;
  }), [asyncState.data, filters]);

  const toggleArrayFilter = (key: "brands" | "types", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const handleSelect = (c: Cooler) => { setComponent("coolerId", c.id); toast.success(`${c.brand} ${c.model} seçildi`); };

  return { asyncState, filtered, filters, options, viewMode, setViewMode, setFilters, toggleArrayFilter, resetFilters: () => setFilters(DEFAULT_FILTERS), handleSelect, selectedId: state.coolerId };
};
