import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Database } from '../../../lib/database.types';
import ErrorBoundary from '../../shared/ErrorBoundary';
import { useConfirm } from '../../../hooks/useConfirm';
import { supabase } from '../../../lib/supabase';

type Topic = Database['public']['Tables']['topics']['Row'];

interface TopicListProps {
  axisId: string | null;
  onSelectTopic: (id: string | null) => void;
  selectedTopic: string | null;
}

const TopicList: React.FC<TopicListProps> = ({ axisId, onSelectTopic, selectedTopic }) => {

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



  return (
    <ErrorBoundary>
      <div className="space-y-4">
      <select
            onChange={(e) => onSelectTopic(e.target.value)}
            value={selectedTopic}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option key="00" value="00">Select</option>
            {topics?.map((axis) => (
              <option key={axis.id} value={axis.id}>
                {axis.name}
              </option>
            ))}
          </select>
      </div>
    </ErrorBoundary>
  );
};

export default TopicList;