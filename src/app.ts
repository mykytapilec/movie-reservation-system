import express from 'express';

import { router } from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';

export const app = express();

app.use(express.json());

app.use('/api', router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);