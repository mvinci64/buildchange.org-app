import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

/** Returns the user's current position, or null if unavailable/denied. */
export function useCurrentLocation() {
  const [pos, setPos] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return; // graceful: map still shows the building
        const loc = await Location.getCurrentPositionAsync({});
        if (active) {
          setPos({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        }
      } catch {
        // ignore — absence of "you" marker is acceptable
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return pos;
}
