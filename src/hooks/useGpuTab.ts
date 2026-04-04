import { useState, useEffect, useMemo } from "react";
import { fetchGpus } from "../service/gpu";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { GPU } from "../types/build";

interface GpuFilters { search: string; brands: string[]; }
const DEFAULT_FILTERS: GpuFilters = { search: "", brands: [] };

export const useGpuTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<GPU[]>>(asyncLoading());
  const [filters, setFilters] = useState<GpuFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    const load = async () => {
      const result = await fetchGpus(1, 200);
      if (!result) { setAsyncState(asyncError("Ekran kartları yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
  }, []);

  const options = useMemo(() => ({ brands: [...new Set((asyncState.data ?? []).map((g) => g.brand))].sort() }), [asyncState.data]);

  const filtered = useMemo(() => {
    const data = asyncState.data ?? [];
    return data.filter((g) => {
      if (filters.search && !`${g.brand} ${g.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.brands.length && !filters.brands.includes(g.brand)) return false;
      return true;
    });
  }, [asyncState.data, filters]);

  const handleSelect = (g: GPU) => {
    setComponent("gpuId", g.id);
    toast.success(`${g.brand} ${g.model} seçildi`);
  };

  return {
    asyncState, filtered, filters, options, viewMode, setViewMode, setFilters,
    toggleBrand: (v: string) => setFilters((f) => ({ ...f, brands: f.brands.includes(v) ? f.brands.filter((b) => b !== v) : [...f.brands, v] })),
    resetFilters: () => setFilters(DEFAULT_FILTERS), handleSelect, selectedId: state.gpuId,
  };
};
