import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchCoolers } from "../service/cooler";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Cooler } from "../types/build";

interface CoolerFilters { brands: string[]; types: string[]; }
type CoolerSortField = "tdpW" | "heightMm";
interface SortState<T extends string> { field: T; direction: "asc" | "desc"; }
const DEFAULT_FILTERS: CoolerFilters = { brands: [], types: [] };
const DEFAULT_SORT: SortState<CoolerSortField> = { field: "tdpW", direction: "desc" };

const buildODataFilter = (search: string): string | undefined => {
  if (!search) return undefined;
  const q = search.replace(/'/g, "''");
  return `contains(tolower(Brand),'${q}') or contains(tolower(Model),'${q}')`;
};

export const useCoolerTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<Cooler[]>>(asyncLoading());
  const [filters, setFilters] = useState<CoolerFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState<CoolerSortField>>(DEFAULT_SORT);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setAsyncState(asyncLoading());
      const r = await fetchCoolers(1, 200, buildODataFilter(committedSearch));
      if (cancelled) return;
      if (!r) { setAsyncState(asyncError("Soğutucular yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(r.items));
    };
    load();
    return () => { cancelled = true; };
  }, [committedSearch]);

  const onSearch = useCallback(() => setCommittedSearch(searchInput.trim().toLowerCase()), [searchInput]);

  const options = useMemo(() => ({
    brands: [...new Set((asyncState.data ?? []).map((c) => c.brand))].sort(),
    types: [...new Set((asyncState.data ?? []).map((c) => c.type))].sort(),
  }), [asyncState.data]);

  const filtered = useMemo(() => {
    const result = (asyncState.data ?? []).filter((c) => {
      if (filters.brands.length && !filters.brands.includes(c.brand)) return false;
      if (filters.types.length && !filters.types.includes(c.type)) return false;
      return true;
    });
    return [...result].sort((a, b) => {
      const aVal = (a[sort.field] ?? 0) as number;
      const bVal = (b[sort.field] ?? 0) as number;
      return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [asyncState.data, filters, sort]);

  const toggleArrayFilter = (key: "brands" | "types", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const handleSelect = (c: Cooler) => { setComponent("coolerId", c.id); toast.success(`${c.brand} ${c.model} seçildi`); };

  return {
    asyncState, filtered, filters, options, sort, setSort, viewMode, setViewMode, setFilters,
    toggleArrayFilter, resetFilters: () => { setFilters(DEFAULT_FILTERS); setSearchInput(""); setCommittedSearch(""); },
    handleSelect, selectedId: state.coolerId, searchInput, setSearchInput, onSearch,
  };
};
