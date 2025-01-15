import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { MicroLearningList } from '../components/microLearning/MicroLearningList';
import { MicroLearningForm } from '../components/microLearning/MicroLearningForm';
import { microLearningService } from '../services/microLearning';
import type { MicroLearning as MicroLearningType } from '../types/curriculum';

export function MicroLearning() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<MicroLearningType | null>(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: microLearningService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['microLearnings'] });
      setIsFormOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MicroLearningType> }) => 
      microLearningService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['microLearnings'] });
      setEditingItem(null);
    }
  });

  const handleEdit = (item: MicroLearningType) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: Partial<MicroLearningType>) => {
    if (editingItem) {
      await updateMutation.mutateAsync({ id: editingItem.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Micro-Learning Content</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6">
              {editingItem ? 'Edit Content' : 'Add New Content'}
            </h2>
            <MicroLearningForm
              initialData={editingItem || undefined}
              onSubmit={handleSubmit}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        </div>
      )}

      <MicroLearningList onEdit={handleEdit} />
    </div>
  );
}