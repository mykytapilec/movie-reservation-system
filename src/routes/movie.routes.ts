import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

export const movieRouter = Router();

movieRouter.post('/', movieController.create);
movieRouter.get('/', movieController.findAll);
movieRouter.get('/:id', movieController.findById);
movieRouter.patch('/:id', movieController.update);
movieRouter.delete('/:id', movieController.remove);