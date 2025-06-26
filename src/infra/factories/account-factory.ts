import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import { env } from '@/main';
import { JsonAccountRepository } from '../repositories/account-repository';

const implementations = {
  json: new JsonAccountRepository(),
};

class AccountFactory {
  public make() {
    if (!Object.keys(implementations).includes(env.REPOSITORY_IMPLEMENTATION)) {
      throw new InfrastructureError('Invalid repository implementation');
    }

    return implementations[env.REPOSITORY_IMPLEMENTATION];
  }
}

export default AccountFactory;
