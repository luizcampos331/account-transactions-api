import 'express-async-errors';
import express from 'express';
import { routes } from './routes';
import globalErrors from './middlewares/global-errors';

function configServer() {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.use(globalErrors);

  return app;
}

export const app = configServer();
