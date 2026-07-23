import type { Request, Response } from 'express';

import { movieService } from '../services/movie.service.js';

type MovieIdRequest = Request<{
  id: string;
}>;

export const movieController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const movie = await movieService.create(req.body);

    res.status(201).json(movie);
  },

  findAll: async (_req: Request, res: Response): Promise<void> => {
    const movies = await movieService.findAll();

    res.json(movies);
  },

  findById: async (req: MovieIdRequest, res: Response): Promise<void> => {
    const movie = await movieService.findById(req.params.id);

    res.json(movie);
  },

  update: async (req: MovieIdRequest, res: Response): Promise<void> => {
    const movie = await movieService.update(req.params.id, req.body);

    res.json(movie);
  },

  remove: async (req: MovieIdRequest, res: Response): Promise<void> => {
    await movieService.remove(req.params.id);

    res.status(204).send();
  },
};
