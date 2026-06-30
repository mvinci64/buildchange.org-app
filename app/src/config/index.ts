export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

/** True when no real backend is configured — the app uses MSW mocks. */
export const USE_MOCKS = API_BASE_URL.trim() === '';

/** Jajarkot Area of Interest (WGS84 / SRID 4326). */
export const AOI_BBOX = {
  minLon: 81.9261,
  minLat: 28.4636,
  maxLon: 82.5596,
  maxLat: 28.8131,
} as const;

/** Map default region (center of the AOI). */
export const AOI_CENTER = {
  latitude: (AOI_BBOX.minLat + AOI_BBOX.maxLat) / 2,
  longitude: (AOI_BBOX.minLon + AOI_BBOX.maxLon) / 2,
  latitudeDelta: 0.45,
  longitudeDelta: 0.65,
} as const;
