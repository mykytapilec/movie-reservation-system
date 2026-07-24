import { prisma } from '../database/prisma.js';
import type { Prisma } from '../generated/prisma/client.js';

import { AppError } from '../utils/app-error.js';

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

  findAll: async (): Promise<
    Awaited<ReturnType<typeof prisma.showtime.findMany>>
  > => {
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

  getAvailableSeats: async (showtimeId: string): Promise<
    {
      id: string;
      row: string;
      number: number;
      isReserved: boolean;
    }[]
  > => {
    const showtime = await prisma.showtime.findUnique({
      where: {
        id: showtimeId,
      },
      include: {
        auditorium: {
          include: {
            seats: {
              orderBy: [
                {
                  row: 'asc',
                },
                {
                  number: 'asc',
                },
              ],
            },
          },
        },
        reservations: {
          select: {
            seatId: true,
          },
        },
      },
    });

    if (!showtime) {
      throw new AppError('Showtime not found', 404);
    }

    const reservedSeatIds = new Set(
      showtime.reservations.map((reservation) => reservation.seatId),
    );

    return showtime.auditorium.seats.map((seat) => ({
      id: seat.id,
      row: seat.row,
      number: seat.number,
      isReserved: reservedSeatIds.has(seat.id),
    }));
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