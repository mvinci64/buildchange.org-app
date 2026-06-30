import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import type { Building } from '@/models/building';
import { DamageBadge } from './DamageBadge';
import { colors, spacing, typography } from '@/theme';

type Props = { building: Building; onPress: () => void };

export function BuildingCard({ building, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={typography.h3}>{building.district}</Text>
        <Text style={styles.sub}>
          Ward {building.ward} · {building.lat.toFixed(3)}, {building.lon.toFixed(3)}
        </Text>
      </View>
      <DamageBadge group={building.damageGroup} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sub: { color: colors.textMuted, marginTop: 2 },
});
