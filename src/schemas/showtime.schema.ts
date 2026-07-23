import { z } from 'zod';

export const createShowtimeSchema = z.object({
  startTime: z.string().datetime(),
  movieId: z.string().uuid(),
  auditoriumId: z.string().uuid(),
});

export const updateShowtimeSchema = z.object({
  startTime: z.string().datetime().optional(),
  movieId: z.string().uuid().optional(),
  auditoriumId: z.string().uuid().optional(),
});