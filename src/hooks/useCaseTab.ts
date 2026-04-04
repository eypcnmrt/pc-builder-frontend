import { useState, useEffect, useMemo } from "react";
import { fetchPcCases } from "../service/pccase";
import { fetchCurrentBuild, updateBuild } from "../service/build";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { PcCase } from "../types/build";
import { useNavigate } from "react-router-dom";

interface CaseFilters { search: string; brands: string[]; formFactors: string[]; }
const DEFAULT_FILTERS: CaseFilters = { search: "", brands: [], formFactors: [] };

export const useCaseTab = () => {
  const { state, setComponent, reset } = useBuildContext();
  const navigate = useNavigate();
  const [asyncState, setAsyncState] = useState<AsyncState<PcCase[]>>(asyncLoading());
  const [filters, setFilters] = useState<CaseFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPcCases(1, 200).then((r) => {
      if (!r) { setAsyncState(asyncError("Kasalar yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(r.items));
    });
  }, []);

  const options = useMemo(() => ({
    brands: [...new Set((asyncState.data ?? []).map((c) => c.brand))].sort(),
    formFactors: [...new Set((asyncState.data ?? []).map((c) => c.formFactor))].sort(),
  }), [asyncState.data]);

  const filtered = useMemo(() => (asyncState.data ?? []).filter((c) => {
    if (filters.search && !`${c.brand} ${c.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.brands.length && !filters.brands.includes(c.brand)) return false;
    if (filters.formFactors.length && !filters.formFactors.includes(c.formFactor)) return false;
    return true;
  }), [asyncState.data, filters]);

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

  return { asyncState, filtered, filters, options, viewMode, setViewMode, setFilters, toggleArrayFilter, resetFilters: () => setFilters(DEFAULT_FILTERS), handleSelect, handleFinalize, isSubmitting, selectedId: state.pcCaseId };
};
