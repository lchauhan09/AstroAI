import { useQuery } from '@tanstack/react-query';
import { api } from './client';

export function useDailyAstro() {
  return useQuery({
    queryKey: ['dailyAstro'],
    queryFn: async () => {
      return await api('/astro/daily');
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useNatalChart() {
  return useQuery({
    queryKey: ['natalChart'],
    queryFn: async () => {
      return await api('/astro/my-natal');
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours, rare to change
  });
}

export function useDailyNumerology() {
  return useQuery({
    queryKey: ['dailyNumerology'],
    queryFn: async () => {
      return await api('/numerology/daily');
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      return await api('/dashboard/');
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
