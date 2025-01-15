import { prisma } from '../client';
import type { Content } from '@prisma/client';

export const contentRepository = {
  async findByTopicId(topicId: number) {
    return prisma.content.findMany({
      where: { topicId },
      orderBy: { sequenceOrder: 'asc' }
    });
  },

  async create(data: Pick<Content, 'topicId' | 'content' | 'sequenceOrder'>) {
    return prisma.content.create({ data });
  }
};