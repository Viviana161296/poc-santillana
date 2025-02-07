import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Database } from '../../../lib/database.types';
import ErrorBoundary from '../../shared/ErrorBoundary';
import { useConfirm } from '../../../hooks/useConfirm';
import { supabase } from '../../../lib/supabase';

type Content = Database['public']['Tables']['contents']['Row'];

interface ContentListProps {
  topicId: string | null;
  onSelectContent: (id: string | null) => void;
  selectedContent: string | null;
}

const ContentList: React.FC<ContentListProps> = ({ topicId, onSelectContent, selectedContent }) => {

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

  if (!topicId) {
    return <div className="text-gray-500 text-sm">Select an axis to view contents</div>;
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
      <select
            onChange={(e) => onSelectContent(e.target.value)}
            value={selectedContent}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option key="00" value="00">Select</option>
            {contents?.map((axis) => (
              <option key={axis.id} value={axis.id}>
                {axis.content}
              </option>
            ))}
          </select>
      </div>
    </ErrorBoundary>
  );
};

export default ContentList;