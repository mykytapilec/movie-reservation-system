import { Router } from 'express';

import { movieRouter } from './movie.routes.js';
import { showtimeRouter } from './showtime.routes.js';

export const router = Router();

router.use('/movies', movieRouter);
router.use('/showtimes', showtimeRouter);