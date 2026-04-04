import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchGpus } from "../service/gpu";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { GPU } from "../types/build";

interface GpuFilters { brands: string[]; }
type GpuSortField = "memoryGb" | "boostClock" | "tdp";
interface SortState<T extends string> { field: T; direction: "asc" | "desc"; }
const DEFAULT_FILTERS: GpuFilters = { brands: [] };
const DEFAULT_SORT: SortState<GpuSortField> = { field: "memoryGb", direction: "desc" };

const buildODataFilter = (search: string): string | undefined => {
  if (!search) return undefined;
  const q = search.replace(/'/g, "''");
  return `contains(tolower(Brand),'${q}') or contains(tolower(Model),'${q}')`;
};

export const useGpuTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<GPU[]>>(asyncLoading());
  const [filters, setFilters] = useState<GpuFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState<GpuSortField>>(DEFAULT_SORT);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setAsyncState(asyncLoading());
      const result = await fetchGpus(1, 200, buildODataFilter(committedSearch));
      if (cancelled) return;
      if (!result) { setAsyncState(asyncError("Ekran kartları yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
    return () => { cancelled = true; };
  }, [committedSearch]);

  const onSearch = useCallback(() => setCommittedSearch(searchInput.trim().toLowerCase()), [searchInput]);

  const options = useMemo(() => ({ brands: [...new Set((asyncState.data ?? []).map((g) => g.brand))].sort() }), [asyncState.data]);

  const filtered = useMemo(() => {
    const result = (asyncState.data ?? []).filter((g) => {
      if (filters.brands.length && !filters.brands.includes(g.brand)) return false;
      return true;
    });
    return [...result].sort((a, b) => {
      const aVal = (a[sort.field] ?? 0) as number;
      const bVal = (b[sort.field] ?? 0) as number;
      return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [asyncState.data, filters, sort]);

  const handleSelect = (g: GPU) => {
    setComponent("gpuId", g.id);
    toast.success(`${g.brand} ${g.model} seçildi`);
  };

  return {
    asyncState, filtered, filters, options, sort, setSort, viewMode, setViewMode, setFilters,
    toggleBrand: (v: string) => setFilters((f) => ({ ...f, brands: f.brands.includes(v) ? f.brands.filter((b) => b !== v) : [...f.brands, v] })),
    resetFilters: () => { setFilters(DEFAULT_FILTERS); setSearchInput(""); setCommittedSearch(""); },
    handleSelect, selectedId: state.gpuId, searchInput, setSearchInput, onSearch,
  };
};
