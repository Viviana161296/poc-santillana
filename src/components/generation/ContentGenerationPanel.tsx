// ContentGenerationPanel.tsx
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { aiService, type GenerationParams } from '../../services/ai';
import { ContentGenerationForm } from './ContentGenerationForm';
import { ContentPreview } from './ContentPreview';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function ContentGenerationPanel() {
  const [generatedContent, setGeneratedContent] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const generateMutation = useMutation({
    mutationFn: aiService.generateContent,
    onSuccess: (data) => {
      const generatedText = data?.content?.completion || '';
      console.log('Generated content:', generatedText);
      setGeneratedContent(generatedText);
      setError(null); // Limpiar el error si la generación es exitosa
    },
    onError: (error) => {
      console.error('Error generating content:', error);
      setError('Failed to generate content. Please try again.'); // Mostrar un mensaje de error
    },
  });

  const handleGenerate = async (data: GenerationParams) => {
    console.log(data);
    try {
      await generateMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error in handleGenerate:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">AI Content Generation</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

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