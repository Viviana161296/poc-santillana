import { Request, Response, NextFunction } from 'express';
import { microLearningRepository } from '../db/repositories/microLearningRepository';
import { mappingRepository } from '../db/repositories/mappingRepository';
import { AppError } from '../lib/errors';

export const microLearningController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await microLearningRepository.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const item = await microLearningRepository.findById(parseInt(id));
      if (!item) {
        throw new AppError('Micro-learning content not found', 404);
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await microLearningRepository.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const item = await microLearningRepository.update(parseInt(id), req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await microLearningRepository.delete(parseInt(id));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  async createMapping(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const mapping = await mappingRepository.create({
        micro_learning_id: parseInt(id),
        content_id: req.body.contentId
      });
      res.status(201).json(mapping);
    } catch (error) {
      next(error);
    }
  }
};