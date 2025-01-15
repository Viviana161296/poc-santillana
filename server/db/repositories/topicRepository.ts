import { prisma } from '../client';
import type { Topic } from '@prisma/client';

export const topicRepository = {
  async findByAxisId(axisId: number) {
    return prisma.topic.findMany({
      where: { axisId },
      include: { contents: true }
    });
  },

  async findById(id: number) {
    return prisma.topic.findUnique({
      where: { id },
      include: { contents: true }
    });
  },

  async create(data: Pick<Topic, 'axisId' | 'name' | 'description'>) {
    return prisma.topic.create({ data });
  }
};