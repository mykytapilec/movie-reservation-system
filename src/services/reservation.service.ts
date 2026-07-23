import { prisma } from '../database/prisma.js';
import type { Prisma } from '../generated/prisma/client.js';

import { AppError } from '../utils/app-error.js';

export const reservationService = {
  create: async (
    data: Prisma.ReservationCreateInput,
  ): Promise<Awaited<ReturnType<typeof prisma.reservation.create>>> => {
    const existingReservation = await prisma.reservation.findUnique({
      where: {
        seatId_showtimeId: {
          seatId: data.seat.connect?.id as string,
          showtimeId: data.showtime.connect?.id as string,
        },
      },
    });

    if (existingReservation) {
      throw new AppError('Seat is already reserved', 409);
    }

    return prisma.reservation.create({
      data,
    });
  },

  findAll: async (): Promise<
    Awaited<ReturnType<typeof prisma.reservation.findMany>>
  > => {
    return prisma.reservation.findMany({
      include: {
        seat: true,
        showtime: {
          include: {
            movie: true,
          },
        },
      },
    });
  },
};