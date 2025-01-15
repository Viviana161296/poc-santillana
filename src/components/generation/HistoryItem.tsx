import React from 'react';
import { Copy } from 'lucide-react';
import type { GeneratedContent } from '../../types/ai';

interface Props {
  item: GeneratedContent;
}

export function HistoryItem({ item }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(item.content);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{item.topic}</h4>
          <div className="flex gap-2 text-sm text-gray-600 mt-1">
            <span className="capitalize">{item.type}</span>
            <span>•</span>
            <span className="capitalize">{item.skillLevel}</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="p-1 hover:text-blue-600"
          title="Copy content"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}