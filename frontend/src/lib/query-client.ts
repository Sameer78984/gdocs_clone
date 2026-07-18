import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1, // Only retry once by default
      refetchOnWindowFocus: false, // Don't refetch on tab switch by default for better DX
    },
  },
});
