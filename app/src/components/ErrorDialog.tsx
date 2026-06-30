import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { colors, spacing, typography } from '@/theme';

type Props = { message: string; onRetry: () => void };

export function ErrorDialog({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[typography.h3, { color: colors.damage4 }]}>Something went wrong</Text>
      <Text style={styles.msg}>{message}</Text>
      <PrimaryButton title="Retry" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  msg: { color: colors.textMuted, marginVertical: spacing.sm, textAlign: 'center' },
});
