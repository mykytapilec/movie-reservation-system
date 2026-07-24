import { prisma } from '../database/prisma.js';

import { AppError } from '../utils/app-error.js';

export const reportService = {
  getSummary: async (): Promise<{
    totalMovies: number;
    totalShowtimes: number;
    totalReservations: number;
    occupancyRate: number;
  }> => {
    const [
      totalMovies,
      totalShowtimes,
      totalReservations,
      totalSeats,
    ] = await Promise.all([
      prisma.movie.count(),
      prisma.showtime.count(),
      prisma.reservation.count(),
      prisma.seat.count(),
    ]);

    const occupancyRate =
      totalSeats === 0
        ? 0
        : Number(((totalReservations / totalSeats) * 100).toFixed(2));

    return {
      totalMovies,
      totalShowtimes,
      totalReservations,
      occupancyRate,
    };
  },

  getShowtimeReport: async (
    showtimeId: string,
  ): Promise<{
    showtimeId: string;
    movie: string;
    totalSeats: number;
    reservedSeats: number;
    availableSeats: number;
    occupancyRate: number;
  }> => {
    const showtime = await prisma.showtime.findUnique({
      where: {
        id: showtimeId,
      },
      include: {
        movie: true,
        auditorium: {
          include: {
            seats: true,
          },
        },
        reservations: true,
      },
    });

    if (!showtime) {
      throw new AppError('Showtime not found', 404);
    }

    const totalSeats = showtime.auditorium.seats.length;
    const reservedSeats = showtime.reservations.length;
    const availableSeats = totalSeats - reservedSeats;

    const occupancyRate =
      totalSeats === 0
        ? 0
        : Number(((reservedSeats / totalSeats) * 100).toFixed(2));

    return {
      showtimeId: showtime.id,
      movie: showtime.movie.title,
      totalSeats,
      reservedSeats,
      availableSeats,
      occupancyRate,
    };
  },
};