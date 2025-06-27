import { Router } from 'express';
import BalanceController from './controllers/balance-controller';
import EventController from './controllers/event-controller';

function exposeRoutes() {
  const routes = Router();

  const balanceController = new BalanceController();
  const eventController = new EventController();

  routes.get('/balance', balanceController.get);
  routes.post('/event', eventController.manage);

  routes.get('/', (_, response) => {
    return response.send('API Account Transactions 1.0.0');
  });

  return routes;
}

export const routes = exposeRoutes();
