import { prisma } from '../database/prisma.js';

export const movieService = {
  create: async (data: {
    title: string;
    description?: string;
    duration: number;
  }) => {
    return prisma.movie.create({
      data,
    });
  },

  findAll: async () => {
    return prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  findById: async (id: string) => {
    return prisma.movie.findUnique({
      where: {
        id,
      },
    });
  },

  update: async (
    id: string,
    data: {
      title?: string;
      description?: string;
      duration?: number;
    },
  ) => {
    return prisma.movie.update({
      where: {
        id,
      },
      data,
    });
  },

  remove: async (id: string) => {
    return prisma.movie.delete({
      where: {
        id,
      },
    });
  },
};