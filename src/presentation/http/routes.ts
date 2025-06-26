import { Router } from 'express';
import BalanceController from './controllers/balance-controller';

function exposeRoutes() {
  const routes = Router();

  const balanceController = new BalanceController();

  routes.get('/balance', balanceController.get);

  routes.get('/', (_, response) => {
    return response.send('API Account Transactions 1.0.0');
  });

  return routes;
}

export const routes = exposeRoutes();
