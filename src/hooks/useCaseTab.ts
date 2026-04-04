import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchPcCases } from "../service/pccase";
import { fetchCurrentBuild, updateBuild } from "../service/build";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { PcCase } from "../types/build";
import { useNavigate } from "react-router-dom";

interface CaseFilters { brands: string[]; formFactors: string[]; }
type CaseSortField = "maxGpuLengthMm" | "maxCoolerHeightMm";
interface SortState<T extends string> { field: T; direction: "asc" | "desc"; }
const DEFAULT_FILTERS: CaseFilters = { brands: [], formFactors: [] };
const DEFAULT_SORT: SortState<CaseSortField> = { field: "maxGpuLengthMm", direction: "desc" };

const buildODataFilter = (search: string): string | undefined => {
  if (!search) return undefined;
  const q = search.replace(/'/g, "''");
  return `contains(tolower(Brand),'${q}') or contains(tolower(Model),'${q}')`;
};

export const useCaseTab = () => {
  const { state, setComponent, reset } = useBuildContext();
  const navigate = useNavigate();
  const [asyncState, setAsyncState] = useState<AsyncState<PcCase[]>>(asyncLoading());
  const [filters, setFilters] = useState<CaseFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState<CaseSortField>>(DEFAULT_SORT);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setAsyncState(asyncLoading());
      const r = await fetchPcCases(1, 200, buildODataFilter(committedSearch));
      if (cancelled) return;
      if (!r) { setAsyncState(asyncError("Kasalar yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(r.items));
    };
    load();
    return () => { cancelled = true; };
  }, [committedSearch]);

  const onSearch = useCallback(() => setCommittedSearch(searchInput.trim().toLowerCase()), [searchInput]);

  const options = useMemo(() => ({
    brands: [...new Set((asyncState.data ?? []).map((c) => c.brand))].sort(),
    formFactors: [...new Set((asyncState.data ?? []).map((c) => c.formFactor))].sort(),
  }), [asyncState.data]);

  const filtered = useMemo(() => {
    const result = (asyncState.data ?? []).filter((c) => {
      if (filters.brands.length && !filters.brands.includes(c.brand)) return false;
      if (filters.formFactors.length && !filters.formFactors.includes(c.formFactor)) return false;
      return true;
    });
    return [...result].sort((a, b) => {
      const aVal = (a[sort.field] ?? 0) as number;
      const bVal = (b[sort.field] ?? 0) as number;
      return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [asyncState.data, filters, sort]);

  const toggleArrayFilter = (key: "brands" | "formFactors", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const handleSelect = (c: PcCase) => { setComponent("pcCaseId", c.id); toast.success(`${c.brand} ${c.model} seçildi`); };

  const handleFinalize = async () => {
    if (!state.pcCaseId) { toast.warning("Önce bir kasa seçmelisin."); return; }
    setIsSubmitting(true);
    try {
      const build = await fetchCurrentBuild();
      if (!build) { toast.error("Build bilgisi alınamadı."); return; }
      const result = await updateBuild(build.id, {
        processorId: state.processorId ?? null,
        motherboardId: state.motherboardId ?? null,
        ramId: state.ramId ?? null,
        storageId: state.storageId ?? null,
        gpuId: state.gpuId ?? null,
        psuId: state.psuId ?? null,
        coolerId: state.coolerId ?? null,
        pcCaseId: state.pcCaseId ?? null,
      });
      if (!result) { toast.error("Build kaydedilemedi. Lütfen tekrar deneyin."); return; }
      toast.success("Build başarıyla kaydedildi!");
      reset();
      navigate("/dashboard");
    } catch {
      toast.error("Beklenmeyen bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    asyncState, filtered, filters, options, sort, setSort, viewMode, setViewMode, setFilters,
    toggleArrayFilter, resetFilters: () => { setFilters(DEFAULT_FILTERS); setSearchInput(""); setCommittedSearch(""); },
    handleSelect, handleFinalize, isSubmitting, selectedId: state.pcCaseId,
    searchInput, setSearchInput, onSearch,
  };
};
