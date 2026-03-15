import { useState, useEffect } from "react";
import { fetchCurrentBuild, fetchBuildActivities } from "../service/build";
import type { Build, BuildActivity } from "../types/build";

export const useDashboard = () => {
  const [build, setBuild] = useState<Build | null>(null);
  const [activities, setActivities] = useState<BuildActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const buildData = await fetchCurrentBuild();
      if (buildData) {
        setBuild(buildData);
        const activityData = await fetchBuildActivities(buildData.id);
        setActivities(activityData ?? []);
      }
      setLoading(false);
    };
    load();
  }, []);

  return { build, activities, loading };
};
