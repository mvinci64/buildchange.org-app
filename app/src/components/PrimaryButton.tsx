import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

type Props = { title: string; onPress: () => void; disabled?: boolean };

export function PrimaryButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={[typography.button, { color: colors.onPrimary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  pressed: { opacity: 0.85 },
  disabled: { backgroundColor: colors.muted },
});
