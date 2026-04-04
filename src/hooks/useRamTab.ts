import { useState, useEffect, useMemo } from "react";
import { fetchRams } from "../service/ram";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { RAM } from "../types/build";

interface RamFilters { search: string; brands: string[]; types: string[]; }
const DEFAULT_FILTERS: RamFilters = { search: "", brands: [], types: [] };

export const useRamTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<RAM[]>>(asyncLoading());
  const [filters, setFilters] = useState<RamFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const ramTypeFilter = state.motherboard?.supportedRamType;

  useEffect(() => {
    const load = async () => {
      const odataFilter = ramTypeFilter
        ? `type eq '${ramTypeFilter.replace(/'/g, "''")}'`
        : undefined;
      const result = await fetchRams(1, 200, odataFilter);
      if (!result) { setAsyncState(asyncError("RAM'ler yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
  }, [ramTypeFilter]);

  const options = useMemo(() => {
    const data = asyncState.data ?? [];
    return {
      brands: [...new Set(data.map((r) => r.brand))].sort(),
      types: [...new Set(data.map((r) => r.type))].sort(),
    };
  }, [asyncState.data]);

  const filtered = useMemo(() => {
    const data = asyncState.data ?? [];
    return data.filter((r) => {
      if (filters.search && !`${r.brand} ${r.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.brands.length && !filters.brands.includes(r.brand)) return false;
      if (filters.types.length && !filters.types.includes(r.type)) return false;
      return true;
    });
  }, [asyncState.data, filters]);

  const toggleArrayFilter = (key: "brands" | "types", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const handleSelect = (ram: RAM) => {
    setComponent("ramId", ram.id);
    toast.success(`${ram.brand} ${ram.model} seçildi`);
  };

  return {
    asyncState, filtered, filters, options, viewMode, setViewMode, setFilters,
    toggleArrayFilter, resetFilters: () => setFilters(DEFAULT_FILTERS),
    handleSelect, selectedId: state.ramId, ramTypeFilter,
  };
};
