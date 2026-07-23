import { Router } from 'express';
import { movieRouter } from './movie.routes.js';

export const router = Router();

router.use('/movies', movieRouter);
