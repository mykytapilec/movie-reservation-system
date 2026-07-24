import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  duration: z.number().int().positive(),
});

export const updateMovieSchema = createMovieSchema.partial();