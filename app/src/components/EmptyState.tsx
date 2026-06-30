import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

type Props = { message: string };

export function EmptyState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={typography.h3}>Nothing here</Text>
      <Text style={styles.msg}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  msg: { color: colors.textMuted, marginTop: spacing.sm, textAlign: 'center' },
});
