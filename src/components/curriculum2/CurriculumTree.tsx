import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRight, ChevronDown, Book } from 'lucide-react';
import { RootState } from '../../store/store';
import { setSelectedAxis, setSelectedTopic } from '../../store/slices/curriculumSlice';
import { Database } from '../../lib/database.types';
import { supabase } from '../../lib/supabase';
import { useQuery, } from '@tanstack/react-query';

type ThematicAxis = Database['public']['Tables']['thematic_axes']['Row'];

export const CurriculumTree: React.FC = () => {
  const dispatch = useDispatch();
  const {  selectedAxisId, selectedTopicId } = useSelector(
    (state: RootState) => state.curriculum
  );
  const { data: axes } = useQuery({
    queryKey: ['thematic-axes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('thematic_axes')
        .select('*, topics (*)')
        .order('name');
      
      if (error) throw error;
      return data as ThematicAxis[];
    },
  });

  const handleAxisClick = (axisId: number) => {
    dispatch(setSelectedAxis(axisId === selectedAxisId ? null : axisId));
  };

  const handleTopicClick = (topicId: number) => {
    dispatch(setSelectedTopic(topicId === selectedTopicId ? null : topicId));
  };

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Curriculum Structure</h2>
      
      <div className="space-y-2">
        {axes?.map((axis) => (
          <div key={axis.id} className="space-y-1">
            <button
              onClick={() => handleAxisClick(axis.id)}
              className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
            >
              {selectedAxisId === axis.id ? (
                <ChevronDown className="w-4 h-4 mr-2" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2" />
              )}
              <span>{axis.name}</span>
            </button>
            {selectedAxisId === axis.id && (
              <div className="ml-6 space-y-1">
                {axis.topics?.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className={`flex items-center w-full text-left p-2 hover:bg-gray-100 rounded ${
                      selectedTopicId === topic.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <Book className="w-4 h-4 mr-2" />
                    <span>{topic.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};