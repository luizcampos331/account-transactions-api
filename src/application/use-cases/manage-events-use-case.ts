import { IAccountRepository } from '@/infra/repositories/account-repository';
import { ApplicationError } from '../errors/application-error';
import DepositEventUseCase from './deposit-event-use-case';

export type ManageEventsInput = {
  type: 'deposit';
  destination: string;
  amount: number;
};

type ManageEventsOutput = {
  destination: {
    id: string;
    balance: number;
  };
};

class ManageEventsUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly depositEventUseCase: DepositEventUseCase,
  ) {}

  public async execute({
    type,
    destination,
    amount,
  }: ManageEventsInput): Promise<ManageEventsOutput> {
    const account = await this.accountRepository.findById(destination);

    switch (type) {
      case 'deposit': {
        const destinationResult = await this.depositEventUseCase.execute({
          account,
          destination,
          amount,
        });

        return { destination: destinationResult };
      }
      default:
        throw new ApplicationError('Invalid type');
    }
  }
}

export default ManageEventsUseCase;
