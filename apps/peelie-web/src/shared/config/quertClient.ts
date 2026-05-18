import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiErrorMessage } from '@/shared/api/types';

const DEFAULT_MUTATION_ERROR_MESSAGE = '요청 처리 중 문제가 발생했어요.';

const isApiErrorMessage = (value: unknown): value is ApiErrorMessage => {
  if (typeof value !== 'object' || value === null) return false;

  const maybeError = value as Partial<ApiErrorMessage>;
  return typeof maybeError.message === 'string';
};

const getMutationErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'errorData' in error) {
    const { errorData } = error as { errorData: unknown };
    if (isApiErrorMessage(errorData)) {
      return errorData.reason || errorData.message || DEFAULT_MUTATION_ERROR_MESSAGE;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return DEFAULT_MUTATION_ERROR_MESSAGE;
};

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.skipGlobalErrorToast) return;

      toast.error(getMutationErrorMessage(error));
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
