import { dummyService } from "../data/dummy";
import type { Build, BuildActivity, UpdateBuildRequest } from "../types/build";
import type { PagedData } from "../types/processor";

export const fetchCurrentBuild = async (): Promise<Build | null> => {
  const result = dummyService.getCurrentBuild();
  return Promise.resolve(result);
};

export const fetchBuildActivities = async (buildId: number): Promise<PagedData<BuildActivity> | null> => {
  const result = dummyService.getBuildActivities(buildId);
  return Promise.resolve(result);
};

export const createBuild = async (name?: string): Promise<Build | null> => {
  const result = dummyService.createBuild();
  return Promise.resolve(result);
};

export const updateBuild = async (id: number, req: UpdateBuildRequest): Promise<Build | null> => {
  const result = dummyService.updateBuild(id, req);
  return Promise.resolve(result);
};

export const deleteBuild = async (id: number): Promise<void | null> => {
  dummyService.deleteBuild(id);
  return Promise.resolve(null);
};
