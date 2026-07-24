import { prisma } from '../database/prisma.js';
import type { Prisma } from '../generated/prisma/client.js';

import { AppError } from '../utils/app-error.js';

export const reservationService = {
  create: async (
    data: Prisma.ReservationCreateInput,
  ): Promise<Awaited<ReturnType<typeof prisma.reservation.create>>> => {
    const seatId = data.seat.connect?.id;
    const showtimeId = data.showtime.connect?.id;

    if (!seatId || !showtimeId) {
      throw new AppError('Seat and showtime are required', 400);
    }

    const showtime = await prisma.showtime.findUnique({
      where: {
        id: showtimeId,
      },
    });

    if (!showtime) {
      throw new AppError('Showtime not found', 404);
    }

    const seat = await prisma.seat.findUnique({
      where: {
        id: seatId,
      },
    });

    if (!seat) {
      throw new AppError('Seat not found', 404);
    }

    if (seat.auditoriumId !== showtime.auditoriumId) {
      throw new AppError(
        'Seat does not belong to showtime auditorium',
        400,
      );
    }

    const existingReservation = await prisma.reservation.findUnique({
      where: {
        seatId_showtimeId: {
          seatId,
          showtimeId,
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

  findById: async (
    id: string,
  ): Promise<Awaited<ReturnType<typeof prisma.reservation.findUnique>>> => {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id,
      },
      include: {
        seat: true,
        showtime: {
          include: {
            movie: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new AppError('Reservation not found', 404);
    }

    return reservation;
  },

  remove: async (id: string): Promise<void> => {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id,
      },
    });

    if (!reservation) {
      throw new AppError('Reservation not found', 404);
    }

    await prisma.reservation.delete({
      where: {
        id,
      },
    });
  },
};