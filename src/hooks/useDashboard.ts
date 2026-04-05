import { useState, useEffect } from "react";
import { fetchCurrentBuild, fetchBuildActivities } from "../service/build";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Build, BuildActivity } from "../types/build";

export const useDashboard = () => {
  const [buildState, setBuildState] = useState<AsyncState<Build>>(asyncLoading());
  const [activities, setActivities] = useState<BuildActivity[]>([]);

  useEffect(() => {
    const load = async () => {
      const build = await fetchCurrentBuild();
      if (!build) {
        setBuildState(asyncError("Build bilgisi yüklenemedi. Lütfen sayfayı yenileyin."));
        return;
      }
      setBuildState(asyncSuccess(build));
      const acts = await fetchBuildActivities(build.id);
      setActivities(acts?.items ?? []);
    };
    load();
  }, []);

  return { buildState, activities };
};
