import { app } from './app.js';
import { env } from './config/env.js';

const start = (): void => {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

start();