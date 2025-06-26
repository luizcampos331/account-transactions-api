import express from 'express';
import { routes } from './routes';

function configServer() {
  const app = express();

  app.use(routes);

  return app;
}

export const app = configServer();
