import { IAccountRepository } from '@/infra/repositories/account-repository';
import { IEventRepository } from '@/infra/repositories/event-repository';
import { ApplicationError } from '../errors/application-error';

export type WithdrawEventInput = {
  origin: string;
  amount: number;
};

type WithdrawEventOutput = {
  id: string;
  balance: number;
};

class WithdrawEventUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly eventRepository: IEventRepository,
  ) {}

  public async execute({
    origin,
    amount,
  }: WithdrawEventInput): Promise<WithdrawEventOutput> {
    const account = await this.accountRepository.findById(origin);

    if (!account) {
      throw new ApplicationError(0, 404);
    }

    account.balance -= amount;
    await this.accountRepository.update(account);

    await this.eventRepository.create({
      account_id: account.id,
      type: 'withdraw',
      amount,
    });

    return {
      id: origin,
      balance: account.balance,
    };
  }
}

export default WithdrawEventUseCase;
