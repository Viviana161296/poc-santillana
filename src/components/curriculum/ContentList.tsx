import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Database } from '../../lib/database.types';
import Modal from '../shared/Modal';
import ContentForm from './forms/ContentForm';
import ErrorBoundary from '../shared/ErrorBoundary';

type Content = Database['public']['Tables']['contents']['Row'];

interface ContentListProps {
  topicId: string | 0;
}

const ContentList: React.FC<ContentListProps> = ({ topicId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery({
    queryKey: ['contents', topicId],
    queryFn: async () => {
      if (!topicId) return [];
      
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('topic_id', topicId)
        .order('sequence_order');
      
      if (error) throw error;
      return data as Content[];
    },
    enabled: !!topicId,
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;

    try {
      await supabase.from('contents').delete().eq('id', id);
      queryClient.invalidateQueries({ queryKey: ['contents', topicId] });
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  if (!topicId) {
    return <div className="text-gray-500 text-sm">Select a topic to view contents</div>;
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
            setEditingContent(null);
            setIsModalOpen(true);
          }}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </button>
        
        <div className="space-y-2">
          {contents?.map((content) => (
            <div
              key={content.id}
              className="group relative p-4 rounded-md border border-gray-200 hover:border-gray-300"
            >
              <div className="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(content)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-700 pr-16">{content.content}</p>
              {content.sequence_order && (
                <span className="mt-2 inline-block text-xs text-gray-500">
                  Sequence: {content.sequence_order}
                </span>
              )}
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingContent ? 'Edit Content' : 'Add New Content'}
        >
          {topicId && (
            <ContentForm
              onClose={() => setIsModalOpen(false)}
              topicId={topicId}
              initialData={editingContent || undefined}
            />
          )}
        </Modal>
      </div>
    </ErrorBoundary>
  );
};

export default ContentList;