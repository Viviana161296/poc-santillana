import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2 } from 'lucide-react';
import type { GenerationParams } from '../../services/ai';

const schema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  type: z.enum(['exercise', 'explanation', 'quiz']),
  skillLevel: z.enum(['basic', 'intermediate', 'advanced']),
  parameters: z.object({
    temperature: z.number().min(0).max(1).optional(),
    maxTokens: z.number().positive().optional(),
    questionCount: z.number().positive().optional()
  }).optional()
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: GenerationParams) => Promise<void>;
  isLoading: boolean;
}

export function ContentGenerationForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      parameters: {
        temperature: 0.7,
        maxTokens: 1000
      }
    }
  });

  const contentType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Topic</label>
        <input
          {...register('topic')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Linear Equations"
        />
        {errors.topic && (
          <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content Type</label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="exercise">Exercise</option>
          <option value="explanation">Explanation</option>
          <option value="quiz">Quiz</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skill Level</label>
        <select
          {...register('skillLevel')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {contentType === 'quiz' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Questions</label>
          <input
            type="number"
            {...register('parameters.questionCount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., 5"
          />
        </div>
      )}

      <div className="space-y-4 pt-4">
        <h4 className="text-sm font-medium text-gray-700">Advanced Settings</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Temperature</label>
          <input
            type="number"
            step="0.1"
            {...register('parameters.temperature', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">Controls randomness (0-1)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
          <input
            type="number"
            {...register('parameters.maxTokens', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <Wand2 className="w-4 h-4 mr-2" />
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </form>
  );
}