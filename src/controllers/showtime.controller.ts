import type { Request, Response } from 'express';

import { showtimeService } from '../services/showtime.service.js';

type ShowtimeIdRequest = Request<{
  id: string;
}>;

export const showtimeController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const showtime = await showtimeService.create(req.body);

    res.status(201).json(showtime);
  },

  findAll: async (_req: Request, res: Response): Promise<void> => {
    const showtimes = await showtimeService.findAll();

    res.json(showtimes);
  },

  findById: async (req: ShowtimeIdRequest, res: Response): Promise<void> => {
    const showtime = await showtimeService.findById(req.params.id);

    res.json(showtime);
  },

  update: async (req: ShowtimeIdRequest, res: Response): Promise<void> => {
    const showtime = await showtimeService.update(
      req.params.id,
      req.body,
    );

    res.json(showtime);
  },

  remove: async (req: ShowtimeIdRequest, res: Response): Promise<void> => {
    await showtimeService.remove(req.params.id);

    res.status(204).send();
  },
};