import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchPsus } from "../service/psu";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { PSU } from "../types/build";

interface PsuFilters { brands: string[]; }
type PsuSortField = "wattage";
interface SortState<T extends string> { field: T; direction: "asc" | "desc"; }
const DEFAULT_FILTERS: PsuFilters = { brands: [] };
const DEFAULT_SORT: SortState<PsuSortField> = { field: "wattage", direction: "desc" };

const buildODataFilter = (search: string): string | undefined => {
  if (!search) return undefined;
  const q = search.replace(/'/g, "''");
  return `contains(tolower(Brand),'${q}') or contains(tolower(Model),'${q}')`;
};

export const usePsuTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<PSU[]>>(asyncLoading());
  const [filters, setFilters] = useState<PsuFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState<PsuSortField>>(DEFAULT_SORT);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setAsyncState(asyncLoading());
      const r = await fetchPsus(1, 200, buildODataFilter(committedSearch));
      if (cancelled) return;
      if (!r) { setAsyncState(asyncError("Güç kaynakları yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(r.items));
    };
    load();
    return () => { cancelled = true; };
  }, [committedSearch]);

  const onSearch = useCallback(() => setCommittedSearch(searchInput.trim().toLowerCase()), [searchInput]);

  const options = useMemo(() => ({ brands: [...new Set((asyncState.data ?? []).map((p) => p.brand))].sort() }), [asyncState.data]);

  const filtered = useMemo(() => {
    const result = (asyncState.data ?? []).filter((p) => {
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      return true;
    });
    return [...result].sort((a, b) =>
      sort.direction === "asc" ? a.wattage - b.wattage : b.wattage - a.wattage
    );
  }, [asyncState.data, filters, sort]);

  const handleSelect = (p: PSU) => { setComponent("psuId", p.id); toast.success(`${p.brand} ${p.model} seçildi`); };

  return {
    asyncState, filtered, filters, options, sort, setSort, viewMode, setViewMode, setFilters,
    toggleBrand: (v: string) => setFilters((f) => ({ ...f, brands: f.brands.includes(v) ? f.brands.filter((b) => b !== v) : [...f.brands, v] })),
    resetFilters: () => { setFilters(DEFAULT_FILTERS); setSearchInput(""); setCommittedSearch(""); },
    handleSelect, selectedId: state.psuId, searchInput, setSearchInput, onSearch,
  };
};
