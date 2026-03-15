import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPcCases } from "../service/pccase";
import { createBuild, updateBuild } from "../service/build";
import { getBuildState, clearBuildState } from "../utils/buildState";
import type { PcCase } from "../types/build";

export interface CaseFilters {
  search: string;
  brands: string[];
  formFactors: string[];
}

const defaultFilters = (items: PcCase[]): CaseFilters => ({
  search: "",
  brands: [],
  formFactors: [],
});

const useCaseSelect = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<PcCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<PcCase | null>(null);
  const [filters, setFilters] = useState<CaseFilters | null>(null);
  const [motherboardFormFactor, setMotherboardFormFactor] = useState<
    string | undefined
  >();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const state = getBuildState();
        setMotherboardFormFactor(state.motherboardFormFactor);
        const odataFilter =
          state.gpuLengthMm != null
            ? `maxGpuLengthMm ge ${state.gpuLengthMm}`
            : undefined;
        const data = await fetchPcCases(1, 100, odataFilter);
        const list = data?.items ?? [];
        if (list.length > 0) {
          setItems(list);
          setFilters(defaultFilters(list));
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const options = useMemo(
    () => ({
      brands: [...new Set(items.map((i) => i.brand))].sort(),
      formFactors: [...new Set(items.map((i) => i.formFactor))].sort(),
    }),
    [items]
  );

  // Sort: matching motherboard form factor first
  const filtered = useMemo(() => {
    if (!filters) return items;
    const base = items.filter((i) => {
      if (
        filters.search &&
        !`${i.brand} ${i.model} ${i.formFactor}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.brands.length && !filters.brands.includes(i.brand))
        return false;
      if (
        filters.formFactors.length &&
        !filters.formFactors.includes(i.formFactor)
      )
        return false;
      return true;
    });

    if (!motherboardFormFactor) return base;

    return [...base].sort((a, b) => {
      const aMatch =
        a.formFactor.toLowerCase() === motherboardFormFactor.toLowerCase();
      const bMatch =
        b.formFactor.toLowerCase() === motherboardFormFactor.toLowerCase();
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [items, filters, motherboardFormFactor]);

  const isMatchingFormFactor = (pcCase: PcCase): boolean => {
    if (!motherboardFormFactor) return false;
    return (
      pcCase.formFactor.toLowerCase() === motherboardFormFactor.toLowerCase()
    );
  };

  const updateFilter = <K extends keyof CaseFilters>(
    key: K,
    value: CaseFilters[K]
  ) => {
    setFilters((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const toggleArrayFilter = (
    key: "brands" | "formFactors",
    value: string
  ) => {
    setFilters((prev) => {
      if (!prev) return prev;
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const resetFilters = () => {
    if (items.length > 0) setFilters(defaultFilters(items));
  };

  const handleSelectById = (id: string) => {
    setSelected(items.find((i) => i.id === Number(id)) ?? null);
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleConfirm = async () => {
    if (!selected) return;
    setIsSaving(true);
    try {
      const state = getBuildState();
      const build = await createBuild();
      if (!build) return;
      await updateBuild(build.id, {
        processorId: state.processorId,
        motherboardId: state.motherboardId,
        ramId: state.ramId,
        storageId: state.storageId,
        gpuId: state.gpuId,
        psuId: state.psuId,
        coolerId: state.coolerId,
        pcCaseId: selected.id,
      });
      clearBuildState();
      navigate("/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    items,
    filtered,
    isLoading,
    isSaving,
    selected,
    filters,
    options,
    motherboardFormFactor,
    isMatchingFormFactor,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    handleSelectById,
    handleConfirm,
  };
};

export default useCaseSelect;
