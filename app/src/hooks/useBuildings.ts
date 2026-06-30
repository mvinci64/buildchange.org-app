import { useCallback, useEffect, useState } from 'react';
import { getLocations } from '@/services/locations';
import { useAppStore } from '@/store/appStore';
import type { Building } from '@/models/building';

/** Loads buildings for a damage group, with in-store caching. */
export function useBuildings(damageGroup: number) {
  const cached = useAppStore((s) => s.cachedBuildings[damageGroup]);
  const cacheBuildings = useAppStore((s) => s.cacheBuildings);

  const [data, setData] = useState<Building[]>(cached ?? []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getLocations(damageGroup);
      setData(list);
      cacheBuildings(damageGroup, list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [damageGroup, cacheBuildings]);

  useEffect(() => {
    if (!cached) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cached, load]);

  return { data, loading, error, reload: load };
}
