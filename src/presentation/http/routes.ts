import { Router } from 'express';
import AccountFactory from '@/infra/factories/account-factory';
import EventFactory from '@/infra/factories/event-factory';
import BalanceController from './controllers/balance-controller';
import EventController from './controllers/event-controller';

function exposeRoutes() {
  const routes = Router();

  const balanceController = new BalanceController();
  const eventController = new EventController();

  routes.get('/balance', balanceController.get);
  routes.post('/event', eventController.manage);

  routes.post('/reset', async (_, response) => {
    const accountRepository = new AccountFactory().make();
    const eventRepository = new EventFactory().make();

    await Promise.all([accountRepository.reset(), eventRepository.reset()]);

    return response.sendStatus(200);
  });

  routes.get('/', (_, response) => {
    return response.send('API Account Transactions 1.0.0');
  });

  return routes;
}

export const routes = exposeRoutes();
