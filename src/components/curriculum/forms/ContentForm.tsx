import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import useForm from '../../../hooks/useForm';

interface ContentFormProps {
  onClose: () => void;
  topicId: string;
  initialData?: {
    id: string;
    content: string;
    sequence_order: number | null;
  };
}

const ContentForm: React.FC<ContentFormProps> = ({ onClose, topicId, initialData }) => {
  const queryClient = useQueryClient();
  const { values, errors, isSubmitting, handleChange, validateAll, setIsSubmitting } = useForm(
    {
      content: initialData?.content || '',
      sequence_order: initialData?.sequence_order?.toString() || '',
    },
    {
      content: { required: true, minLength: 10 },
      sequence_order: { pattern: /^\d*$/ },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      const contentData = {
        content: values.content,
        sequence_order: values.sequence_order ? parseInt(values.sequence_order) : null,
      };

      if (initialData) {
        await supabase
          .from('contents')
          .update(contentData)
          .eq('id', initialData.id);
      } else {
        await supabase
          .from('contents')
          .insert({ ...contentData, topic_id: topicId });
      }
      
      queryClient.invalidateQueries({ queryKey: ['contents', topicId] });
      onClose();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={values.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sequence Order</label>
        <input
          type="text"
          value={values.sequence_order}
          onChange={(e) => handleChange('sequence_order', e.target.value)}
          placeholder="Optional"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.sequence_order && <p className="mt-1 text-sm text-red-600">{errors.sequence_order}</p>}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default ContentForm;