import instance from "./instance";
import type { Build, BuildActivity, UpdateBuildRequest } from "../types/build";

export const fetchCurrentBuild = async () =>
  instance.get<Build>("Build/current");

export const fetchBuildActivities = async (buildId: number) =>
  instance.get<BuildActivity[]>(`Build/${buildId}/activities`);

export const createBuild = async (name?: string) =>
  instance.post<Build>("Build", { name });

export const updateBuild = async (id: number, req: UpdateBuildRequest) =>
  instance.put<Build>(`Build/${id}`, req);

export const deleteBuild = async (id: number) =>
  instance.del<void>(`Build/${id}`);
