import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { HomeScreen } from '@/screens/HomeScreen';
import { ListScreen } from '@/screens/ListScreen';
import { DetailScreen } from '@/screens/DetailScreen';
import { MapScreen } from '@/screens/MapScreen';
import { colors } from '@/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.onPrimary,
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Nepal Aid' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Buildings' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
