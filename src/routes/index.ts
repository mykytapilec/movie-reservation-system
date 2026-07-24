import { Router } from 'express';

import { movieRouter } from './movie.routes.js';
import { showtimeRouter } from './showtime.routes.js';
import { reservationRouter } from './reservation.routes.js';
import { reportRouter } from './report.routes.js';
import { docsRouter } from './docs.routes.js';

export const router = Router();

router.use('/movies', movieRouter);
router.use('/showtimes', showtimeRouter);
router.use('/reservations', reservationRouter);
router.use('/reports', reportRouter);
router.use('/docs', docsRouter);