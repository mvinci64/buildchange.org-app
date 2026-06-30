import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { damageColor } from '@/theme';

type Props = { group: number };

export function DamageBadge({ group }: Props) {
  return (
    <View
      style={[styles.badge, { backgroundColor: damageColor(group) }]}
      accessibilityLabel={`Damage group ${group}`}
    >
      <Text style={styles.text}>G{group}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, minWidth: 36, alignItems: 'center' },
  text: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
});
