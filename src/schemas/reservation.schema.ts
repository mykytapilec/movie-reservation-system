import { z } from 'zod';

export const createReservationSchema = z.object({
  customerName: z.string().trim().min(2),
  seatId: z.string().uuid(),
  showtimeId: z.string().uuid(),
});