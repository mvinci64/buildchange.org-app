import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { AOI_CENTER } from '@/config';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

export function MapScreen({ route }: Props) {
  const { building } = route.params;
  const me = useCurrentLocation();

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        showsUserLocation
        initialRegion={{
          latitude: building.lat,
          longitude: building.lon,
          latitudeDelta: AOI_CENTER.latitudeDelta / 6,
          longitudeDelta: AOI_CENTER.longitudeDelta / 6,
        }}
      >
        <Marker
          coordinate={{ latitude: building.lat, longitude: building.lon }}
          title={`${building.district} — Ward ${building.ward}`}
          description={`Damage group ${building.damageGroup}`}
        />
        {me && <Marker coordinate={me} pinColor="blue" title="You" />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
