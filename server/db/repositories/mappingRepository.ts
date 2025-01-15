import { prisma } from '../client';
import type { ContentMapping } from '@prisma/client';

type CreateMappingData = Pick<ContentMapping, 'micro_learning_id' | 'content_id'>;

export const mappingRepository = {
  async findByMicroLearningId(microLearningId: number) {
    return prisma.contentMapping.findMany({
      where: { micro_learning_id: microLearningId },
      include: { content: true }
    });
  },

  async create(data: CreateMappingData) {
    return prisma.contentMapping.create({ data });
  },

  async deleteByMicroLearningId(microLearningId: number) {
    return prisma.contentMapping.deleteMany({
      where: { micro_learning_id: microLearningId }
    });
  }
};