import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import { env } from '@/main';
import { JsonEventRepository } from '../repositories/event-repository';

const implementations = {
  json: new JsonEventRepository(),
};

class EventFactory {
  public make() {
    if (!Object.keys(implementations).includes(env.REPOSITORY_IMPLEMENTATION)) {
      throw new InfrastructureError('Invalid repository implementation');
    }

    return implementations[env.REPOSITORY_IMPLEMENTATION];
  }
}

export default EventFactory;
