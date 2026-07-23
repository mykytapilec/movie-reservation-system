import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  duration: z.number().positive(),
});

export const updateMovieSchema = createMovieSchema.partial();
