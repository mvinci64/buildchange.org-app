import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { MapButton } from '@/components/MapButton';
import { DamageBadge } from '@/components/DamageBadge';
import { colors, spacing, typography } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export function DetailScreen({ route, navigation }: Props) {
  const { building } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={typography.h2}>
          {building.district} — Ward {building.ward}
        </Text>
        <DamageBadge group={building.damageGroup} />
      </View>

      <Text style={styles.row}>Damage group: {building.damageGroup}</Text>
      <Text style={styles.row}>Latitude: {building.lat.toFixed(5)}</Text>
      <Text style={styles.row}>Longitude: {building.lon.toFixed(5)}</Text>

      <MapButton onPress={() => navigation.navigate('Map', { building })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  row: { marginVertical: spacing.xs, color: colors.text, fontSize: 16 },
});
