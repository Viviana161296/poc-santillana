import React from 'react';
import { Play, Book, Video, Target } from 'lucide-react';
import type { MicroLearning } from '../../types/curriculum';

const typeIcons = {
  video: Video,
  text: Book,
  interactive: Play,
  quiz: Target
};

interface Props {
  type: MicroLearning['type'];
  className?: string;
}

export function MicroLearningTypeIcon({ type, className = "w-5 h-5 text-blue-600" }: Props) {
  const Icon = typeIcons[type];
  return <Icon className={className} />;
}