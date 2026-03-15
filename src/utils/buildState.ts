export interface BuildState {
  processorId?: number;
  processorSocket?: string;
  processorTdp?: number;
  motherboardId?: number;
  motherboardFormFactor?: string;
  motherboardRamType?: string;
  ramId?: number;
  storageId?: number;
  gpuId?: number;
  gpuTdp?: number;
  gpuLengthMm?: number;
  psuId?: number;
  coolerId?: number;
  coolerHeightMm?: number;
  pcCaseId?: number;
}

const KEY = "pc-builder-build-state";

export const getBuildState = (): BuildState => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as BuildState;
  } catch {
    return {};
  }
};

export const saveBuildState = (updates: Partial<BuildState>): void => {
  const current = getBuildState();
  localStorage.setItem(KEY, JSON.stringify({ ...current, ...updates }));
};

export const clearBuildState = (): void => {
  localStorage.removeItem(KEY);
};
