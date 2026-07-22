import { prisma } from '../database/prisma.js';

export const movieService = {
  create: async (data: {
    title: string;
    description?: string;
    duration: number;
  }): Promise<ReturnType<typeof prisma.movie.create>> => {
    return prisma.movie.create({
      data,
    });
  },

  findAll: async (): Promise<ReturnType<typeof prisma.movie.findMany>> => {
    return prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  findById: async (id: number): Promise<ReturnType<typeof prisma.movie.findUnique>> => {
    return prisma.movie.findUnique({
      where: {
        id,
      },
    });
  },

  update: async (
    id: number,
    data: {
      title?: string;
      description?: string;
      duration?: number;
    },
  ): Promise<ReturnType<typeof prisma.movie.update>> => {
    return prisma.movie.update({
      where: {
        id,
      },
      data,
    });
  },

  remove: async (id: number): Promise<ReturnType<typeof prisma.movie.delete>> => {
    return prisma.movie.delete({
      where: {
        id,
      },
    });
  },
};