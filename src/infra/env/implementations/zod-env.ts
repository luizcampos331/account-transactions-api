import { z } from 'zod';
import { EnvProps } from '../env-props';

class ZodEnv {
  public validateEnv(envs: NodeJS.ProcessEnv): EnvProps {
    const envSchema = z.object({
      NODE_ENV: z
        .enum(['local', 'development', 'production'])
        .default('development'),
      HTTP_PORT: z.coerce.number().default(3333),
      REPOSITORY_IMPLEMENTATION: z.enum(['json']),
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
