import type { Building } from '@/models/building';

export type RootStackParamList = {
  Home: undefined;
  List: { damageGroup: number };
  Detail: { building: Building };
  Map: { building: Building };
};
