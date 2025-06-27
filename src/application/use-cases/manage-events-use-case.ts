import { IAccountRepository } from '@/infra/repositories/account-repository';
import { ApplicationError } from '../errors/application-error';
import DepositEventUseCase from './deposit-event-use-case';
import WithdrawEventUseCase from './withdraw-event-use-case';

export type ManageEventsInput = {
  type: 'deposit' | 'withdraw';
  destination: string;
  origin: string;
  amount: number;
};

type ManageEventsOutput = {
  destination?: {
    id: string;
    balance: number;
  };
  origin?: {
    id: string;
    balance: number;
  };
};

class ManageEventsUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly depositEventUseCase: DepositEventUseCase,
    private readonly withdrawEventUseCase: WithdrawEventUseCase,
  ) {}

  public async execute({
    type,
    destination,
    origin,
    amount,
  }: ManageEventsInput): Promise<ManageEventsOutput> {
    switch (type) {
      case 'deposit': {
        const destinationResult = await this.depositEventUseCase.execute({
          destination,
          amount,
        });

        return { destination: destinationResult };
      }

      case 'withdraw': {
        const originResult = await this.withdrawEventUseCase.execute({
          origin,
          amount,
        });

        return { origin: originResult };
      }
      default:
        throw new ApplicationError('Invalid type');
    }
  }
}

export default ManageEventsUseCase;
