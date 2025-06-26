/* eslint-disable import/no-mutable-exports */
import { EnvProps } from './infra/env/env-props';
import EnvFactory from './infra/factories/envs-factory';

export let env: EnvProps;

(async () => {
  env = await EnvFactory.loadEnvs({ test: false });

  const { app } = await import('@/presentation/http/app');

  app.listen(env.HTTP_PORT, () => {
    console.log(`HTTP server is running on port - ${env.HTTP_PORT}`);
  });
})();
