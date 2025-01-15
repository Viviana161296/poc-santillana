import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { microLearningService } from '../../services/microLearning';
import { MicroLearningCard } from './MicroLearningCard';
import type { MicroLearning } from '../../types/curriculum';

interface Props {
  onEdit: (item: MicroLearning) => void;
}

export function MicroLearningList({ onEdit }: Props) {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({
    queryKey: ['microLearnings'],
    queryFn: microLearningService.getAll
  });

  const deleteMutation = useMutation({
    mutationFn: microLearningService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['microLearnings'] });
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items?.map((item: MicroLearning) => (
        <MicroLearningCard
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onDelete={() => deleteMutation.mutate(item.id)}
        />
      ))}
    </div>
  );
}