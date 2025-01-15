import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { aiService, GenerationParams } from '../../services/ai';
import { ContentGenerationForm } from './ContentGenerationForm';
import { ContentPreview } from './ContentPreview';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function ContentGenerationPanel() {
  const [generatedContent, setGeneratedContent] = React.useState<string | null>(null);

  const generateMutation = useMutation({
    mutationFn: aiService.generateContent,
    onSuccess: (data) => setGeneratedContent(data.content)
  });

  const handleGenerate = async (data: GenerationParams) => {
    await generateMutation.mutateAsync(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">AI Content Generation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Generation Parameters</h3>
          <ContentGenerationForm
            onSubmit={handleGenerate}
            isLoading={generateMutation.isPending}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          {generateMutation.isPending ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <ContentPreview content={generatedContent} />
          )}
        </div>
      </div>
    </div>
  );
}