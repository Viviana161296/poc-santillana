import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { microLearningService } from '../services/microLearning';
import type { MicroLearning } from '../types/curriculum';

export function useMicroLearning() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['microLearnings'],
    queryFn: microLearningService.getAll
  });

  const createMutation = useMutation({
    mutationFn: microLearningService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['microLearnings'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MicroLearning> }) =>
      microLearningService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['microLearnings'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: microLearningService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['microLearnings'] });
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending
  };
}