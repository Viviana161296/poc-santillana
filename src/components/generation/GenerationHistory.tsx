import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock } from 'lucide-react';
import { aiService } from '../../services/ai';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { HistoryItem } from './HistoryItem';

export function GenerationHistory() {
  const { data: history, isLoading } = useQuery({
    queryKey: ['generationHistory'],
    queryFn: aiService.getGenerationHistory
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Generation History
      </h3>
      
      <div className="space-y-3">
        {history?.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}