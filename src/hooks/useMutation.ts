import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface MutationOptions<T> {
  onMutate?: (variables: T) => Promise<unknown>;
  onSuccess?: () => void;
  onError?: (error: Error, variables: T, context: unknown) => void;
  onSettled?: () => void;
}

export function useMutation<T>(
  mutationFn: (variables: T) => Promise<void>,
  queryKey: unknown[],
  options: MutationOptions<T> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const mutate = async (variables: T) => {
    setIsLoading(true);
    setError(null);
    let context: unknown;

    try {
      if (options.onMutate) {
        context = await options.onMutate(variables);
      }

      await mutationFn(variables);
      
      queryClient.invalidateQueries({ queryKey });
      options.onSuccess?.();
    } catch (e) {
      setError(e as Error);
      options.onError?.(e as Error, variables, context);
    } finally {
      setIsLoading(false);
      options.onSettled?.();
    }
  };

  return { mutate, isLoading, error };
}