import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import useForm from '../../../hooks/useForm';

interface TopicFormProps {
  onClose: () => void;
  axisId: string;
  initialData?: {
    id: string;
    name: string;
    description: string | null;
  };
}

const TopicForm: React.FC<TopicFormProps> = ({ onClose, axisId, initialData }) => {
  const queryClient = useQueryClient();
  const { values, errors, isSubmitting, handleChange, validateAll, setIsSubmitting } = useForm(
    {
      name: initialData?.name || '',
      description: initialData?.description || '',
    },
    {
      name: { required: true, minLength: 3, maxLength: 255 },
      description: { maxLength: 1000 },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      if (initialData) {
        await supabase
          .from('topics')
          .update(values)
          .eq('id', initialData.id);
      } else {
        await supabase
          .from('topics')
          .insert({ ...values, axis_id: axisId });
      }
      
      queryClient.invalidateQueries({ queryKey: ['topics', axisId] });
      onClose();
    } catch (error) {
      console.error('Error saving topic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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

export default TopicForm;