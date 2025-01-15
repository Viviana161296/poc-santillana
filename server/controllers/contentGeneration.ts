import { Request, Response, NextFunction } from 'express';
import { generateContent } from '../services/ai/bedrock';
import { promptTemplates } from '../services/ai/promptTemplates';
import { microLearningRepository } from '../db/repositories/microLearningRepository';
import { AppError } from '../lib/errors';

export const contentGenerationController = {
  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const { topic, type, skillLevel, parameters } = req.body;
      
      const promptTemplate = promptTemplates[type];
      if (!promptTemplate) {
        throw new AppError('Invalid content type', 400);
      }

      const prompt = promptTemplate(topic, skillLevel);
      const content = await generateContent(prompt, parameters);

      res.json({ content });
    } catch (error) {
      next(error);
    }
  },

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, type, skillLevel } = req.body;
      
      const microLearning = await microLearningRepository.create({
        title,
        type,
        skill_level: skillLevel,
        content_url: null,
        duration: null
      });

      res.status(201).json(microLearning);
    } catch (error) {
      next(error);
    }
  }
};