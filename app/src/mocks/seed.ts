import type { Building } from '@/models/building';

// Sample data within the Jajarkot AOI (SRID 4326). Districts/wards mirror the
// real dataset (Nepal_Aid_New45.csv). Used only when running on mocks.
export const SEED_BUILDINGS: Building[] = [
  { id: 1, district: 'Bheri', ward: '01', lat: 28.691, lon: 82.209, damageGroup: 4 },
  { id: 2, district: 'Bheri', ward: '03', lat: 28.705, lon: 82.263, damageGroup: 3 },
  { id: 3, district: 'Chhedagad', ward: '02', lat: 28.66, lon: 82.19, damageGroup: 4 },
  { id: 4, district: 'Chhedagad', ward: '05', lat: 28.642, lon: 82.31, damageGroup: 2 },
  { id: 5, district: 'Nalgad', ward: '04', lat: 28.55, lon: 82.41, damageGroup: 3 },
  { id: 6, district: 'Nalgad', ward: '07', lat: 28.52, lon: 82.38, damageGroup: 1 },
  { id: 7, district: 'Barekot', ward: '01', lat: 28.78, lon: 82.5, damageGroup: 2 },
  { id: 8, district: 'Kushe', ward: '06', lat: 28.6, lon: 82.45, damageGroup: 1 },
  { id: 9, district: 'Junichande', ward: '03', lat: 28.7, lon: 82.33, damageGroup: 4 },
  { id: 10, district: 'Shivalaya', ward: '02', lat: 28.62, lon: 82.27, damageGroup: 3 },
];

export function seedByGroup(group: number): Building[] {
  return SEED_BUILDINGS.filter((b) => b.damageGroup === group);
}
