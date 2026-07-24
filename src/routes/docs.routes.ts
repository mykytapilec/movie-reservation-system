import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDocument } from '../docs/swagger.js';

export const docsRouter = Router();

docsRouter.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);