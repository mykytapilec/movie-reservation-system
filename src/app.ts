import express from 'express';

import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { healthRouter } from './routes/health.routes.js';
import { router } from './routes/index.js';

export const app = express();

app.use(express.json());

app.use('/health', healthRouter);

app.use('/api', router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);