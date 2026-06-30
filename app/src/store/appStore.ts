import { create } from 'zustand';
import type { Building } from '@/models/building';

type LatLng = { latitude: number; longitude: number };

type AppState = {
  selectedDamageGroup: number | null;
  selectedBuilding: Building | null;
  cachedBuildings: Record<number, Building[]>; // keyed by damageGroup
  gpsLocation: LatLng | null;
  loading: boolean;

  setDamageGroup: (g: number) => void;
  setSelectedBuilding: (b: Building | null) => void;
  cacheBuildings: (group: number, list: Building[]) => void;
  setGps: (loc: LatLng | null) => void;
  setLoading: (v: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedDamageGroup: null,
  selectedBuilding: null,
  cachedBuildings: {},
  gpsLocation: null,
  loading: false,

  setDamageGroup: (g) => set({ selectedDamageGroup: g }),
  setSelectedBuilding: (b) => set({ selectedBuilding: b }),
  cacheBuildings: (group, list) =>
    set((s) => ({ cachedBuildings: { ...s.cachedBuildings, [group]: list } })),
  setGps: (loc) => set({ gpsLocation: loc }),
  setLoading: (v) => set({ loading: v }),
}));
