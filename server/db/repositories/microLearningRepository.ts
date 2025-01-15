import { prisma } from '../client';
import type { MicroLearning } from '@prisma/client';

type CreateMicroLearningData = Pick<MicroLearning, 
  'title' | 'type' | 'duration' | 'content_url' | 'skill_level'
>;

export const microLearningRepository = {
  async findAll() {
    console.log('Finding all micro learnings...');
    return prisma.microLearning.findMany({
      orderBy: { created_at: 'desc' }
    });
  },

  async findById(id: number) {
    return prisma.microLearning.findUnique({
      where: { id },
      include: {
        content_mappings: {
          include: { content: true }
        }
      }
    });
  },

  async create(data: CreateMicroLearningData) {
    return prisma.microLearning.create({ data });
  },

  async update(id: number, data: Partial<CreateMicroLearningData>) {
    console.log('Updating micro learning...');
    return prisma.microLearning.update({
      where: { id },
      data
    });
  },

  async delete(id: number) {
    return prisma.microLearning.delete({
      where: { id }
    });
  }
};