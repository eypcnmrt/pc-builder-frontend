export interface CompatibilityCheckRequest {
  processorId?: number | null;
  motherboardId?: number | null;
  gpuId?: number | null;
  ramId?: number | null;
  storageId?: number | null;
  psuId?: number | null;
  pcCaseId?: number | null;
  coolerId?: number | null;
}
