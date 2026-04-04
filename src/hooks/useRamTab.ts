import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchRams } from "../service/ram";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { RAM } from "../types/build";

interface RamFilters { brands: string[]; types: string[]; }
type RamSortField = "capacityGb" | "speedMhz" | "latencyCl";
interface SortState<T extends string> { field: T; direction: "asc" | "desc"; }
const DEFAULT_FILTERS: RamFilters = { brands: [], types: [] };
const DEFAULT_SORT: SortState<RamSortField> = { field: "capacityGb", direction: "desc" };

export const useRamTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<RAM[]>>(asyncLoading());
  const [filters, setFilters] = useState<RamFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState<RamSortField>>(DEFAULT_SORT);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  const ramTypeFilter = state.motherboard?.supportedRamType;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setAsyncState(asyncLoading());
      const parts: string[] = [];
      if (ramTypeFilter) parts.push(`type eq '${ramTypeFilter.replace(/'/g, "''")}'`);
      if (committedSearch) {
        const q = committedSearch.replace(/'/g, "''");
        parts.push(`(contains(tolower(Brand),'${q}') or contains(tolower(Model),'${q}'))`);
      }
      const result = await fetchRams(1, 200, parts.length ? parts.join(" and ") : undefined);
      if (cancelled) return;
      if (!result) { setAsyncState(asyncError("RAM'ler yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
    return () => { cancelled = true; };
  }, [ramTypeFilter, committedSearch]);

  const onSearch = useCallback(() => setCommittedSearch(searchInput.trim().toLowerCase()), [searchInput]);

  const options = useMemo(() => {
    const data = asyncState.data ?? [];
    return {
      brands: [...new Set(data.map((r) => r.brand))].sort(),
      types: [...new Set(data.map((r) => r.type))].sort(),
    };
  }, [asyncState.data]);

  const filtered = useMemo(() => {
    const result = (asyncState.data ?? []).filter((r) => {
      if (filters.brands.length && !filters.brands.includes(r.brand)) return false;
      if (filters.types.length && !filters.types.includes(r.type)) return false;
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

  const handleSelect = (ram: RAM) => {
    setComponent("ramId", ram.id);
    toast.success(`${ram.brand} ${ram.model} seçildi`);
  };

  return {
    asyncState, filtered, filters, options, sort, setSort, viewMode, setViewMode, setFilters,
    toggleArrayFilter, resetFilters: () => { setFilters(DEFAULT_FILTERS); setSearchInput(""); setCommittedSearch(""); },
    handleSelect, selectedId: state.ramId, ramTypeFilter, searchInput, setSearchInput, onSearch,
  };
};
