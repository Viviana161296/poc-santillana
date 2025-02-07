import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import { Database } from '../../../lib/database.types';
import ErrorBoundary from '../../shared/ErrorBoundary';

type ThematicAxis = Database['public']['Tables']['thematic_axes']['Row'];

interface CurriculumListProps {
  onSelectAxis: (id: string | null) => void;
  selectedAxis: string | null;
}

const CurriculumList: React.FC<CurriculumListProps> = ({ onSelectAxis, selectedAxis }) => {

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
            onChange={(e) => onSelectAxis(e.target.value)}
            value={selectedAxis}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option key="00" value="00">Select</option>
            {axes?.map((axis) => (
              <option key={axis.id} value={axis.id}>
                {axis.name}
              </option>
            ))}
          </select>     
      </div>
    </ErrorBoundary>
  );
};

export default CurriculumList;