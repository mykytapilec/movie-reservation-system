import { prisma } from '../database/prisma.js';
import type { Prisma } from '../generated/prisma/client.js';

export const movieService = {
  create: async (
    data: Prisma.MovieCreateInput,
  ): Promise<Awaited<ReturnType<typeof prisma.movie.create>>> => {
    return prisma.movie.create({
      data,
    });
  },

  findAll: async (): Promise<Awaited<ReturnType<typeof prisma.movie.findMany>>> => {
    return prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  findById: async (id: string): Promise<Awaited<ReturnType<typeof prisma.movie.findUnique>>> => {
    return prisma.movie.findUnique({
      where: {
        id,
      },
    });
  },

  update: async (
    id: string,
    data: Prisma.MovieUpdateInput,
  ): Promise<Awaited<ReturnType<typeof prisma.movie.update>>> => {
    return prisma.movie.update({
      where: {
        id,
      },
      data,
    });
  },

  remove: async (id: string): Promise<Awaited<ReturnType<typeof prisma.movie.delete>>> => {
    return prisma.movie.delete({
      where: {
        id,
      },
    });
  },
};
