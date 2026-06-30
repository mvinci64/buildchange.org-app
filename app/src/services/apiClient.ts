import axios from 'axios';
import { API_BASE_URL } from '@/config';

export const apiClient = axios.create({
  baseURL: API_BASE_URL || 'http://mock.local', // MSW intercepts when mocks are active
  timeout: 12_000,
  headers: { 'Content-Type': 'application/json' },
});

// Centralized error normalization — services and UI see a plain Error.
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message ?? err?.message ?? 'Network error. Please retry.';
    return Promise.reject(new Error(message));
  },
);
