import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from '@/services/apiClient';
import { USE_MOCKS } from '@/config';
import { DAMAGE_GROUPS } from '@/models/damageGroup';
import { SEED_BUILDINGS, seedByGroup } from './seed';

function makeResponse<T>(config: InternalAxiosRequestConfig, data: T, status = 200): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config,
  };
}

/**
 * When no backend is configured (USE_MOCKS), install an axios adapter that
 * serves seed data for the documented endpoints. This lets the full
 * Home -> List -> Detail -> Map flow run with zero backend.
 */
export async function startMocks(): Promise<void> {
  if (!USE_MOCKS) return;

  const adapter: AxiosAdapter = async (config) => {
    const url = config.url ?? '';
    await new Promise((r) => setTimeout(r, 300)); // simulate latency

    if (url.startsWith('/locations')) {
      const group = Number(config.params?.damageGroup ?? 1);
      return makeResponse(config, seedByGroup(group));
    }
    if (url.startsWith('/building/')) {
      const id = Number(url.split('/').pop());
      const found = SEED_BUILDINGS.find((b) => b.id === id);
      if (!found) return Promise.reject(new Error('Not found'));
      return makeResponse(config, found);
    }
    if (url.startsWith('/districts')) {
      return makeResponse(config, [...new Set(SEED_BUILDINGS.map((b) => b.district))]);
    }
    if (url.startsWith('/damagegroups')) {
      return makeResponse(config, DAMAGE_GROUPS);
    }
    return makeResponse(config, { message: 'Mock: unknown route' }, 404);
  };

  apiClient.defaults.adapter = adapter;
  // eslint-disable-next-line no-console
  console.log('[mocks] axios mock adapter installed (no backend configured)');
}
