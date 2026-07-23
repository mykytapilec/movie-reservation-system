import { Router } from 'express';

import { movieController } from '../controllers/movie.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createMovieSchema, updateMovieSchema } from '../schemas/movie.schema.js';
import { asyncHandler } from '../utils/async-handler.js';

export const movieRouter = Router();

movieRouter.post(
  '/',
  validate(createMovieSchema),
  asyncHandler(movieController.create),
);

movieRouter.get(
  '/',
  asyncHandler(movieController.findAll),
);

movieRouter.get(
  '/:id',
  asyncHandler(movieController.findById),
);

movieRouter.patch(
  '/:id',
  validate(updateMovieSchema),
  asyncHandler(movieController.update),
);

movieRouter.delete(
  '/:id',
  asyncHandler(movieController.remove),
);