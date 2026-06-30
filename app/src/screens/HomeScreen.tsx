import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { PrimaryButton } from '@/components/PrimaryButton';
import { DAMAGE_GROUPS } from '@/models/damageGroup';
import { useAppStore } from '@/store/appStore';
import { colors, spacing, typography } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const [group, setGroup] = useState<number>(DAMAGE_GROUPS[0]!.value);
  const setDamageGroup = useAppStore((s) => s.setDamageGroup);

  const onCreate = () => {
    setDamageGroup(group);
    navigation.navigate('List', { damageGroup: group });
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.h2, styles.title]}>Nepal Aid</Text>
      <Text style={styles.subtitle}>Jajarkot earthquake — damage assessment</Text>

      <Text style={styles.label}>Damage group</Text>
      <View style={styles.pickerWrap}>
        <Picker selectedValue={group} onValueChange={(v) => setGroup(Number(v))}>
          {DAMAGE_GROUPS.map((g) => (
            <Picker.Item key={g.value} label={g.label} value={g.value} />
          ))}
        </Picker>
      </View>

      <PrimaryButton title="Create List" onPress={onCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, justifyContent: 'center', backgroundColor: colors.background },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', color: colors.textMuted, marginBottom: spacing.xl },
  label: { color: colors.text, marginBottom: spacing.xs, fontWeight: '600' },
  pickerWrap: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, overflow: 'hidden' },
});
