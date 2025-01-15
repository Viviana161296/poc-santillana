import { Request, Response, NextFunction } from 'express';
import { axisRepository } from '../db/repositories/axisRepository';
import { topicRepository } from '../db/repositories/topicRepository';
import { contentRepository } from '../db/repositories/contentRepository';
import { AppError } from '../lib/errors';

export const curriculumController = {
  async getAxes(req: Request, res: Response, next: NextFunction) {
    try {
      const axes = await axisRepository.findAll();
      res.json(axes);
    } catch (error) {
      next(error);
    }
  },

  async createAxis(req: Request, res: Response, next: NextFunction) {
    try {
      const axis = await axisRepository.create(req.body);
      res.status(201).json(axis);
    } catch (error) {
      next(error);
    }
  },

  async getTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const topics = await topicRepository.findByAxisId(parseInt(id));
      res.json(topics);
    } catch (error) {
      next(error);
    }
  },

  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await topicRepository.create(req.body);
      res.status(201).json(topic);
    } catch (error) {
      next(error);
    }
  },

  async getContents(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const contents = await contentRepository.findByTopicId(parseInt(id));
      res.json(contents);
    } catch (error) {
      next(error);
    }
  },

  async createContent(req: Request, res: Response, next: NextFunction) {
    try {
      const content = await contentRepository.create(req.body);
      res.status(201).json(content);
    } catch (error) {
      next(error);
    }
  }
};