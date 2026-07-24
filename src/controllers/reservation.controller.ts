import type { Request, Response } from 'express';

import { reservationService } from '../services/reservation.service.js';

type ReservationIdRequest = Request<{
  id: string;
}>;

export const reservationController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const reservation = await reservationService.create(req.body);

    res.status(201).json(reservation);
  },

  findAll: async (_req: Request, res: Response): Promise<void> => {
    const reservations = await reservationService.findAll();

    res.json(reservations);
  },

  findById: async (
    req: ReservationIdRequest,
    res: Response,
  ): Promise<void> => {
    const reservation = await reservationService.findById(req.params.id);

    res.json(reservation);
  },

  remove: async (
    req: ReservationIdRequest,
    res: Response,
  ): Promise<void> => {
    await reservationService.remove(req.params.id);

    res.status(204).send();
  },
};