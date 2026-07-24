import { Router } from 'express';

import { showtimeController } from '../controllers/showtime.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createShowtimeSchema,
  updateShowtimeSchema,
} from '../schemas/showtime.schema.js';
import { asyncHandler } from '../utils/async-handler.js';

export const showtimeRouter = Router();

showtimeRouter.post(
  '/',
  validate(createShowtimeSchema),
  asyncHandler(showtimeController.create),
);

showtimeRouter.get(
  '/',
  asyncHandler(showtimeController.findAll),
);

showtimeRouter.get(
  '/:id',
  asyncHandler(showtimeController.findById),
);

showtimeRouter.get(
  '/:id/seats',
  asyncHandler(showtimeController.getAvailableSeats),
);

showtimeRouter.patch(
  '/:id',
  validate(updateShowtimeSchema),
  asyncHandler(showtimeController.update),
);

showtimeRouter.delete(
  '/:id',
  asyncHandler(showtimeController.remove),
);