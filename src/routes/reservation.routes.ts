import { Router } from 'express';

import { reservationController } from '../controllers/reservation.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createReservationSchema } from '../schemas/reservation.schema.js';
import { asyncHandler } from '../utils/async-handler.js';

export const reservationRouter = Router();

reservationRouter.post(
  '/',
  validate(createReservationSchema),
  asyncHandler(reservationController.create),
);

reservationRouter.get(
  '/',
  asyncHandler(reservationController.findAll),
);

reservationRouter.get(
  '/:id',
  asyncHandler(reservationController.findById),
);

reservationRouter.delete(
  '/:id',
  asyncHandler(reservationController.remove),
);