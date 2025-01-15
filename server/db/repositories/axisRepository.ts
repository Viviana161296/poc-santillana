import { prisma } from '../client';
import type { ThematicAxis } from '@prisma/client';

export const axisRepository = {
  async findAll() {
    return prisma.thematicAxis.findMany({
      include: { topics: true }
    });
  },

  async findById(id: number) {
    return prisma.thematicAxis.findUnique({
      where: { id },
      include: { topics: true }
    });
  },

  async create(data: Pick<ThematicAxis, 'name' | 'description'>) {
    return prisma.thematicAxis.create({ data });
  }
};