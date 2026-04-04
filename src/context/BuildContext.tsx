import React, { createContext, useContext, useState, useCallback } from "react";
import type { Processor } from "../types/processor";
import type { Motherboard } from "../types/motherboard";

export interface BuildState {
  buildId?: number;
  processorId?: number;
  motherboardId?: number;
  ramId?: number;
  storageId?: number;
  gpuId?: number;
  psuId?: number;
  coolerId?: number;
  pcCaseId?: number;
  // Görüntüleme önbelleği
  processor?: Processor;
  motherboard?: Motherboard;
}

interface BuildContextValue {
  state: BuildState;
  setComponent: <K extends keyof BuildState>(key: K, value: BuildState[K]) => void;
  reset: () => void;
}

const STORAGE_KEY = "pc-builder-wizard-state";

const loadFromSession = (): BuildState => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BuildState) : {};
  } catch {
    return {};
  }
};

const BuildContext = createContext<BuildContextValue>({
  state: {},
  setComponent: () => {},
  reset: () => {},
});

export const BuildProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<BuildState>(loadFromSession);

  const setComponent = useCallback(
    <K extends keyof BuildState>(key: K, value: BuildState[K]) => {
      setState((prev) => {
        const next = { ...prev, [key]: value };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState({});
  }, []);

  return (
    <BuildContext.Provider value={{ state, setComponent, reset }}>
      {children}
    </BuildContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBuildContext = () => useContext(BuildContext);
