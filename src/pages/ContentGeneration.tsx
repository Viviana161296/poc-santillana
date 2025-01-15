import React from 'react';
import { ContentGenerationPanel } from '../components/generation/ContentGenerationPanel';

export function ContentGeneration() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Content Generation</h1>
      <ContentGenerationPanel />
    </div>
  );
}