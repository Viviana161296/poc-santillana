import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Database } from '../../lib/database.types';
import Modal from '../shared/Modal';
import TopicForm from './forms/TopicForm';
import ErrorBoundary from '../shared/ErrorBoundary';
import { useMutation } from '../../hooks/useMutation';
import { useConfirm } from '../../hooks/useConfirm';
import { deleteTopic } from '../../services/supabase/topics';
import { supabase } from '../../lib/supabase';

type Topic = Database['public']['Tables']['topics']['Row'];

interface TopicListProps {
  axisId: string | null;
  onSelectTopic: (id: string | null) => void;
  selectedTopic: string | null;
}

const TopicList: React.FC<TopicListProps> = ({ axisId, onSelectTopic, selectedTopic }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { data: topics, isLoading } = useQuery({
    queryKey: ['topics', axisId],
    queryFn: async () => {
      if (!axisId) return [];
      
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .eq('axis_id', axisId)
        .order('name');
      
      if (error) throw error;
      return data as Topic[];
    },
    enabled: !!axisId,
  });

  const { mutate: handleDelete } = useMutation(
    async (id: string) => {
      const shouldDelete = await confirm('Are you sure you want to delete this topic?');
      if (!shouldDelete) return;

      await deleteTopic(id);
      if (selectedTopic === id) onSelectTopic(null);
    },
    ['topics', axisId],
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ['topics', axisId] });
        const previousTopics = queryClient.getQueryData<Topic[]>(['topics', axisId]);
        
        queryClient.setQueryData<Topic[]>(['topics', axisId], (old) => 
          old?.filter(topic => topic.id !== id) ?? []
        );

        return { previousTopics };
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData(['topics', axisId], context.previousTopics);
      }
    }
  );

  const handleEdit = (axis: Topic) => {
    setEditingTopic(axis);
    setIsModalOpen(true);
  };

  if (!axisId) {
    return <div className="text-gray-500 text-sm">Select an axis to view topics</div>;
  }

  if (isLoading) {
    return <div className="animate-pulse space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-12 bg-gray-200 rounded"></div>
      ))}
    </div>;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <button
          onClick={() => {
            setEditingTopic(null);
            setIsModalOpen(true);
          }}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Axis
        </button>
        
        <div className="space-y-2">
          {topics?.map((axis) => (
            <div
              key={axis.id}
              className="flex items-center space-x-2 rounded-md bg-white border border-gray-200"
            >
              <button
                onClick={() => onSelectTopic(axis.id)}
                className={`flex-grow text-left px-4 py-2 text-sm ${
                  selectedTopic === axis.id
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {axis.name}
              </button>
              <div className="flex space-x-1 px-2">
                <button
                  onClick={() => handleEdit(axis)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(axis.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTopic ? 'Edit Axis' : 'Add New Axis'}
        >
          <TopicForm
            axisId={axisId}
            onClose={() => setIsModalOpen(false)}
            initialData={editingTopic || undefined}
          />
        </Modal>
      </div>
    </ErrorBoundary>
  );
};

export default TopicList;