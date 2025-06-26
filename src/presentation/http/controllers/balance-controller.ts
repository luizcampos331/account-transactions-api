import { Request, Response } from 'express';
import GetBalanceUseCase from '@/application/use-cases/get-balance-use-case';
import AccountFactory from '@/infra/factories/account-factory';
import ZodAccountParameters from '../parameters/zod-balance-parameters';

class BalanceController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { account_id } = new ZodAccountParameters().get(request.query);

    const getBalanceUseCase = new GetBalanceUseCase(
      new AccountFactory().make(),
    );

    const data = await getBalanceUseCase.execute({
      account_id,
    });

    return response.send(data);
  }
}

export default BalanceController;
