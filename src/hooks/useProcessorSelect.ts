import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProcessors } from "../service/processor";
import { fetchCompatibleMotherboards } from "../service/motherboard";
import type { Processor } from "../types/processor";
import type { Motherboard } from "../types/motherboard";

export interface ProcessorFilters {
  search: string;
  brands: string[];
  sockets: string[];
  memoryTypes: string[];
  integratedGraphics: "all" | "yes" | "no";
  coreRange: [number, number];
  priceRange: [number, number];
  tdpRange: [number, number];
  boostClockRange: [number, number];
}

export interface MotherboardFilters {
  search: string;
  brands: string[];
  chipsets: string[];
  formFactors: string[];
  supportedRamTypes: string[];
  ramSlotsRange: [number, number];
  maxRamRange: [number, number];
}

const defaultProcessorFilters = (processors: Processor[]): ProcessorFilters => {
  const prices = processors.map((p) => p.price);
  const tdps = processors.map((p) => p.tdp);
  const boosts = processors.map((p) => p.boostClock);
  const cores = processors.map((p) => p.cores);
  return {
    search: "",
    brands: [],
    sockets: [],
    memoryTypes: [],
    integratedGraphics: "all",
    coreRange: [Math.min(...cores), Math.max(...cores)],
    priceRange: [Math.min(...prices), Math.max(...prices)],
    tdpRange: [Math.min(...tdps), Math.max(...tdps)],
    boostClockRange: [Math.min(...boosts), Math.max(...boosts)],
  };
};

const defaultMotherboardFilters = (motherboards: Motherboard[]): MotherboardFilters => {
  const ramSlots = motherboards.map((m) => m.ramSlots);
  const maxRams = motherboards.map((m) => m.maxRamGb);
  return {
    search: "",
    brands: [],
    chipsets: [],
    formFactors: [],
    supportedRamTypes: [],
    ramSlotsRange: [Math.min(...ramSlots), Math.max(...ramSlots)],
    maxRamRange: [Math.min(...maxRams), Math.max(...maxRams)],
  };
};

const useProcessorSelect = () => {
  const navigate = useNavigate();

  // Processor state
  const [processors, setProcessors] = useState<Processor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Processor | null>(null);
  const [filters, setFilters] = useState<ProcessorFilters | null>(null);

  // Motherboard state
  const [motherboards, setMotherboards] = useState<Motherboard[]>([]);
  const [motherboardFilters, setMotherboardFilters] = useState<MotherboardFilters | null>(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState<Motherboard | null>(null);
  const [isMotherboardLoading, setIsMotherboardLoading] = useState(false);

  // Load processors on mount
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await fetchProcessors(1, 100);
      if (data) {
        setProcessors(data.items);
        setFilters(defaultProcessorFilters(data.items));
      }
      setIsLoading(false);
    };
    load();
  }, []);

  // Load compatible motherboards when processor is selected
  useEffect(() => {
    if (!selected) {
      setMotherboards([]);
      setMotherboardFilters(null);
      setSelectedMotherboard(null);
      return;
    }

    const load = async () => {
      setIsMotherboardLoading(true);
      setSelectedMotherboard(null);
      const data = await fetchCompatibleMotherboards(selected.socket);
      if (data && data.items.length > 0) {
        setMotherboards(data.items);
        setMotherboardFilters(defaultMotherboardFilters(data.items));
      } else {
        setMotherboards([]);
        setMotherboardFilters(null);
      }
      setIsMotherboardLoading(false);
    };
    load();
  }, [selected]);

  // Processor options
  const options = useMemo(() => ({
    brands: [...new Set(processors.map((p) => p.brand))].sort(),
    sockets: [...new Set(processors.map((p) => p.socket))].sort(),
    memoryTypes: [...new Set(processors.map((p) => p.memoryType))].sort(),
    minPrice: processors.length ? Math.min(...processors.map((p) => p.price)) : 0,
    maxPrice: processors.length ? Math.max(...processors.map((p) => p.price)) : 100000,
    minTdp: processors.length ? Math.min(...processors.map((p) => p.tdp)) : 0,
    maxTdp: processors.length ? Math.max(...processors.map((p) => p.tdp)) : 300,
    minBoost: processors.length ? Math.min(...processors.map((p) => p.boostClock)) : 0,
    maxBoost: processors.length ? Math.max(...processors.map((p) => p.boostClock)) : 7,
    minCores: processors.length ? Math.min(...processors.map((p) => p.cores)) : 1,
    maxCores: processors.length ? Math.max(...processors.map((p) => p.cores)) : 32,
  }), [processors]);

  // Motherboard options
  const motherboardOptions = useMemo(() => ({
    brands: [...new Set(motherboards.map((m) => m.brand))].sort(),
    chipsets: [...new Set(motherboards.map((m) => m.chipset))].sort(),
    formFactors: [...new Set(motherboards.map((m) => m.formFactor))].sort(),
    supportedRamTypes: [...new Set(motherboards.map((m) => m.supportedRamType))].sort(),
    minRamSlots: motherboards.length ? Math.min(...motherboards.map((m) => m.ramSlots)) : 2,
    maxRamSlots: motherboards.length ? Math.max(...motherboards.map((m) => m.ramSlots)) : 8,
    minMaxRam: motherboards.length ? Math.min(...motherboards.map((m) => m.maxRamGb)) : 0,
    maxMaxRam: motherboards.length ? Math.max(...motherboards.map((m) => m.maxRamGb)) : 256,
  }), [motherboards]);

  // Filtered processors
  const filtered = useMemo(() => {
    if (!filters) return processors;
    return processors.filter((p) => {
      if (filters.search && !`${p.brand} ${p.model} ${p.series} ${p.architecture}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.sockets.length && !filters.sockets.includes(p.socket)) return false;
      if (filters.memoryTypes.length && !filters.memoryTypes.includes(p.memoryType)) return false;
      if (filters.integratedGraphics === "yes" && !p.integratedGraphics) return false;
      if (filters.integratedGraphics === "no" && p.integratedGraphics) return false;
      if (p.cores < filters.coreRange[0] || p.cores > filters.coreRange[1]) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      if (p.tdp < filters.tdpRange[0] || p.tdp > filters.tdpRange[1]) return false;
      if (p.boostClock < filters.boostClockRange[0] || p.boostClock > filters.boostClockRange[1]) return false;
      return true;
    });
  }, [processors, filters]);

  // Filtered motherboards
  const filteredMotherboards = useMemo(() => {
    if (!motherboardFilters) return motherboards;
    return motherboards.filter((m) => {
      if (motherboardFilters.search && !`${m.brand} ${m.model} ${m.chipset} ${m.formFactor}`.toLowerCase().includes(motherboardFilters.search.toLowerCase())) return false;
      if (motherboardFilters.brands.length && !motherboardFilters.brands.includes(m.brand)) return false;
      if (motherboardFilters.chipsets.length && !motherboardFilters.chipsets.includes(m.chipset)) return false;
      if (motherboardFilters.formFactors.length && !motherboardFilters.formFactors.includes(m.formFactor)) return false;
      if (motherboardFilters.supportedRamTypes.length && !motherboardFilters.supportedRamTypes.includes(m.supportedRamType)) return false;
      if (m.ramSlots < motherboardFilters.ramSlotsRange[0] || m.ramSlots > motherboardFilters.ramSlotsRange[1]) return false;
      if (m.maxRamGb < motherboardFilters.maxRamRange[0] || m.maxRamGb > motherboardFilters.maxRamRange[1]) return false;
      return true;
    });
  }, [motherboards, motherboardFilters]);

  // Processor filter helpers
  const updateFilter = <K extends keyof ProcessorFilters>(key: K, value: ProcessorFilters[K]) => {
    setFilters((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const toggleArrayFilter = (key: "brands" | "sockets" | "memoryTypes", value: string) => {
    setFilters((prev) => {
      if (!prev) return prev;
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const resetFilters = () => setFilters(defaultProcessorFilters(processors));

  // Motherboard filter helpers
  const updateMotherboardFilter = <K extends keyof MotherboardFilters>(key: K, value: MotherboardFilters[K]) => {
    setMotherboardFilters((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const toggleMotherboardArrayFilter = (
    key: "brands" | "chipsets" | "formFactors" | "supportedRamTypes",
    value: string
  ) => {
    setMotherboardFilters((prev) => {
      if (!prev) return prev;
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const resetMotherboardFilters = () => {
    if (motherboards.length > 0) {
      setMotherboardFilters(defaultMotherboardFilters(motherboards));
    }
  };

  // Selection handlers
  const handleSelectById = (id: string) => {
    setSelected(processors.find((p) => p.id === Number(id)) ?? null);
  };

  const handleMotherboardSelectById = (id: string) => {
    setSelectedMotherboard(motherboards.find((m) => m.id === Number(id)) ?? null);
  };

  const handleConfirm = () => {
    if (!selected || !selectedMotherboard) return;
    navigate("/dashboard");
  };

  return {
    // Processor
    filtered, isLoading, selected, filters, options,
    updateFilter, toggleArrayFilter, resetFilters,
    handleSelectById,
    // Motherboard
    motherboards, motherboardFilters, selectedMotherboard, isMotherboardLoading,
    motherboardOptions, filteredMotherboards,
    updateMotherboardFilter, toggleMotherboardArrayFilter, resetMotherboardFilters,
    handleMotherboardSelectById,
    // Shared
    handleConfirm,
  };
};

export default useProcessorSelect;
