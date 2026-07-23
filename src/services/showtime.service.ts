import { prisma } from '../database/prisma.js';
import type { Prisma } from '../generated/prisma/client.js';

export const showtimeService = {
  create: async (
    data: Prisma.ShowtimeCreateInput,
  ): Promise<Awaited<ReturnType<typeof prisma.showtime.create>>> => {
    return prisma.showtime.create({
      data,
      include: {
        movie: true,
        auditorium: true,
      },
    });
  },

  findAll: async (): Promise<Awaited<ReturnType<typeof prisma.showtime.findMany>>> => {
    return prisma.showtime.findMany({
      orderBy: {
        startTime: 'asc',
      },
      include: {
        movie: true,
        auditorium: true,
      },
    });
  },

  findById: async (
    id: string,
  ): Promise<Awaited<ReturnType<typeof prisma.showtime.findUnique>>> => {
    return prisma.showtime.findUnique({
      where: {
        id,
      },
      include: {
        movie: true,
        auditorium: true,
      },
    });
  },

  update: async (
    id: string,
    data: Prisma.ShowtimeUpdateInput,
  ): Promise<Awaited<ReturnType<typeof prisma.showtime.update>>> => {
    return prisma.showtime.update({
      where: {
        id,
      },
      data,
      include: {
        movie: true,
        auditorium: true,
      },
    });
  },

  remove: async (
    id: string,
  ): Promise<Awaited<ReturnType<typeof prisma.showtime.delete>>> => {
    return prisma.showtime.delete({
      where: {
        id,
      },
    });
  },
};