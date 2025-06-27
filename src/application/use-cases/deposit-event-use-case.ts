import { IAccountDTO } from '@/entities/i-account-dto';
import { IAccountRepository } from '@/infra/repositories/account-repository';
import { IEventRepository } from '@/infra/repositories/event-repository';

export type DepositEventInput = {
  account: IAccountDTO | null;
  destination: string;
  amount: number;
};

type DepositEventOutput = {
  id: string;
  balance: number;
};

class DepositEventUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly eventRepository: IEventRepository,
  ) {}

  public async execute({
    account,
    destination,
    amount,
  }: DepositEventInput): Promise<DepositEventOutput> {
    if (!account) {
      account = {
        id: destination,
        balance: amount,
      };
      await this.accountRepository.create(account);
    } else {
      account.balance += amount;
      await this.accountRepository.update(account);
    }

    await this.eventRepository.create({
      account_id: account.id,
      type: 'deposit',
      amount,
    });

    return {
      id: destination,
      balance: account.balance,
    };
  }
}

export default DepositEventUseCase;
