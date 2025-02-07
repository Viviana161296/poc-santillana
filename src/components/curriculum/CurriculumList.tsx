import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Database } from '../../lib/database.types';
import Modal from '../shared/Modal';
import AxisForm from './forms/AxisForm';
import TopicForm from './forms/TopicForm';
import ErrorBoundary from '../shared/ErrorBoundary';

type ThematicAxis = Database['public']['Tables']['thematic_axes']['Row'];

interface CurriculumListProps {
  onSelectAxis: (id: string | null) => void;
  selectedAxis: string | null;
}

const CurriculumList: React.FC<CurriculumListProps> = ({ onSelectAxis, selectedAxis }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAxis, setEditingAxis] = useState<ThematicAxis | null>(null);
  const queryClient = useQueryClient();

  const { data: axes, isLoading } = useQuery({
    queryKey: ['thematic-axes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('thematic_axes')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as ThematicAxis[];
    },
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this axis?')) return;

    try {
      await supabase.from('thematic_axes').delete().eq('id', id);
      queryClient.invalidateQueries({ queryKey: ['thematic-axes'] });
      if (selectedAxis === id) onSelectAxis(null);
    } catch (error) {
      console.error('Error deleting axis:', error);
    }
  };

  const handleEdit = (axis: ThematicAxis) => {
    setEditingAxis(axis);
    setIsModalOpen(true);
  };

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
            setEditingAxis(null);
            setIsModalOpen(true);
          }}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Axis
        </button>
        
        <div className="space-y-2">
          {axes?.map((axis) => (
            <div
              key={axis.id}
              className="flex items-center space-x-2 rounded-md bg-white border border-gray-200"
            >
              <button
                onClick={() => onSelectAxis(axis.id)}
                className={`flex-grow text-left px-4 py-2 text-sm ${
                  selectedAxis === axis.id
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
          title={editingAxis ? 'Edit Axis' : 'Add New Axis'}
        >
          <AxisForm
            onClose={() => setIsModalOpen(false)}
            initialData={editingAxis || undefined}
          />
        </Modal>
      </div>
    </ErrorBoundary>
  );
};

export default CurriculumList;