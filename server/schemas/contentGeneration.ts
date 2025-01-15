import { z } from 'zod';

export const contentGenerationSchema = {
  generate: z.object({
    topic: z.string().min(1),
    type: z.enum(['exercise', 'explanation', 'quiz']),
    skillLevel: z.enum(['basic', 'intermediate', 'advanced']),
    parameters: z.object({
      temperature: z.number().min(0).max(1).optional(),
      maxTokens: z.number().positive().optional(),
      questionCount: z.number().positive().optional()
    }).optional()
  }),

  save: z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    type: z.enum(['video', 'text', 'interactive', 'quiz']),
    skillLevel: z.enum(['basic', 'intermediate', 'advanced'])
  })
};