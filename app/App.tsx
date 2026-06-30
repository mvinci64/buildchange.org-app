import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { startMocks } from './src/mocks/startMocks';

export default function App() {
  // When no API base URL is configured, run against in-app MSW mocks so the
  // full flow is demoable without a backend (see DEVELOPER_BOOK.md §20, §23 Phase 2).
  useEffect(() => {
    void startMocks();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
