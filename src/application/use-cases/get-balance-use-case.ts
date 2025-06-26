import { IAccountRepository } from '@/infra/repositories/account-repository';
import { ApplicationError } from '../errors/application-error';

export type GetBalanceInput = {
  account_id: number;
};

class GetBalanceUseCase {
  constructor(private readonly accountRepository: IAccountRepository) {}

  public async execute({ account_id }: GetBalanceInput): Promise<string> {
    const account = await this.accountRepository.findById(account_id);

    if (!account) {
      throw new ApplicationError(0, 404);
    }

    return account.balance.toString();
  }
}

export default GetBalanceUseCase;
