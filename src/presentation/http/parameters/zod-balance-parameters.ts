import { GetBalanceInput } from '@/application/use-cases/get-balance-use-case';
import { z } from 'zod';
import { ParameterError } from './errors/parameter-error';

class ZodBalanceParameters {
  public get(query: any): GetBalanceInput {
    const dataSchema = z.object({
      account_id: z.coerce.number(),
    });

    const _query = dataSchema.safeParse(query);

    if (_query.success === false) {
      throw new ParameterError(_query.error.format());
    }

    return _query.data;
  }
}

export default ZodBalanceParameters;
