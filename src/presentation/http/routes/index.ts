import { Router } from 'express';

function exposeRoutes() {
  const routes = Router();

  routes.get('/', (_, response) => {
    return response.send('API Account Transactions 1.0.0');
  });

  return routes;
}

export const routes = exposeRoutes();
