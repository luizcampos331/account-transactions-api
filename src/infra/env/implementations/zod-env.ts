import { z } from 'zod';
import { EnvProps } from '../env-props';

class ZodEnv {
  public validateEnv(envs: NodeJS.ProcessEnv): EnvProps {
    const envSchema = z.object({
      // Env
      NODE_ENV: z
        .enum(['test', 'local', 'development', 'production'])
        .default('development'),

      // Application
      HTTP_PORT: z.coerce.number().default(3333),
    });

    const _env = envSchema.safeParse(envs);

    if (_env.success === false) {
      console.error({
        message: 'Invalid environment variables',
        payload: _env.error.format(),
      });

      throw new Error('Invalid environment variables');
    }

    return _env.data;
  }
}

export default ZodEnv;
