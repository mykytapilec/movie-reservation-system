import type { Request, Response } from 'express';

import { reservationService } from '../services/reservation.service.js';

export const reservationController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const reservation = await reservationService.create(req.body);

    res.status(201).json(reservation);
  },

  findAll: async (_req: Request, res: Response): Promise<void> => {
    const reservations = await reservationService.findAll();

    res.json(reservations);
  },
};