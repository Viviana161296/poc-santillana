import { z } from 'zod';

export const microLearningSchema = {
  create: z.object({
    title: z.string().min(1).max(255),
    type: z.enum(['video', 'text', 'interactive', 'quiz']),
    duration: z.number().optional(),
    content_url: z.string().url().optional(),
    skill_level: z.enum(['basic', 'intermediate', 'advanced']).optional()
  }),

  update: z.object({
    title: z.string().min(1).max(255).optional(),
    type: z.enum(['video', 'text', 'interactive', 'quiz']).optional(),
    duration: z.number().optional(),
    content_url: z.string().url().optional(),
    skill_level: z.enum(['basic', 'intermediate', 'advanced']).optional()
  }),

  mapping: z.object({
    contentId: z.number()
  })
};