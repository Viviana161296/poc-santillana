import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { MicroLearningTypeIcon } from './MicroLearningTypeIcon';
import type { MicroLearning } from '../../types/curriculum';

interface Props {
  item: MicroLearning;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MicroLearningCard({ item, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <MicroLearningTypeIcon type={item.type} />
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(item.id)} 
            className="p-1 hover:text-blue-600"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(item.id)} 
            className="p-1 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Type:</span>
          <span className="ml-2 capitalize">{item.type}</span>
        </div>
        {item.duration && (
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Duration:</span>
            <span className="ml-2">{item.duration} min</span>
          </div>
        )}
        {item.skillLevel && (
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Level:</span>
            <span className="ml-2 capitalize">{item.skillLevel}</span>
          </div>
        )}
      </div>
    </div>
  );
}