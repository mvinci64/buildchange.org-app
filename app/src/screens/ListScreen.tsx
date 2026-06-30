import React from 'react';
import { FlatList, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { useBuildings } from '@/hooks/useBuildings';
import { useAppStore } from '@/store/appStore';
import { BuildingCard } from '@/components/BuildingCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import { ErrorDialog } from '@/components/ErrorDialog';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export function ListScreen({ route, navigation }: Props) {
  const { damageGroup } = route.params;
  const { data, loading, error, reload } = useBuildings(damageGroup);
  const setSelectedBuilding = useAppStore((s) => s.setSelectedBuilding);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDialog message={error} onRetry={reload} />;
  if (!data.length) return <EmptyState message="No buildings for this damage group. Try another group." />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(b) => String(b.id)}
        renderItem={({ item }) => (
          <BuildingCard
            building={item}
            onPress={() => {
              setSelectedBuilding(item);
              navigation.navigate('Detail', { building: item });
            }}
          />
        )}
      />
    </View>
  );
}
