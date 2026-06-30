import { apiClient } from './apiClient';
import type { Building } from '@/models/building';

type LocationDTO = {
  id: number;
  district: string;
  ward: string;
  lat: number;
  lon: number;
  damageGroup: number;
};

/** GET /locations?damageGroup=N — buildings/wards for a damage group. */
export async function getLocations(damageGroup: number): Promise<Building[]> {
  const { data } = await apiClient.get<LocationDTO[]>('/locations', {
    params: { damageGroup },
  });
  // DTO == model today; map explicitly so future drift is caught at the seam.
  return data.map((d) => ({ ...d }));
}

/** GET /building/{id} — a single location. */
export async function getBuilding(id: number): Promise<Building> {
  const { data } = await apiClient.get<LocationDTO>(`/building/${id}`);
  return { ...data };
}
