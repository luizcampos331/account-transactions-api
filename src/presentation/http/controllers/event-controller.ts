import { Request, Response } from 'express';
import AccountFactory from '@/infra/factories/account-factory';
import ManageEventsUseCase from '@/application/use-cases/manage-events-use-case';
import DepositEventUseCase from '@/application/use-cases/deposit-event-use-case';
import EventFactory from '@/infra/factories/event-factory';
import WithdrawEventUseCase from '@/application/use-cases/withdraw-event-use-case';
import ZodEventParameters from '../parameters/zod-event-parameters';

class EventController {
  public async manage(request: Request, response: Response): Promise<Response> {
    const body = new ZodEventParameters().manage(request.body);

    const accountRepository = new AccountFactory().make();
    const eventRepository = new EventFactory().make();

    const depositEventUseCase = new DepositEventUseCase(
      accountRepository,
      eventRepository,
    );
    const withdrawEventUseCase = new WithdrawEventUseCase(
      accountRepository,
      eventRepository,
    );

    const getEventUseCase = new ManageEventsUseCase(
      accountRepository,
      depositEventUseCase,
      withdrawEventUseCase,
    );

    const data = await getEventUseCase.execute(body);

    return response.send(data);
  }
}

export default EventController;
