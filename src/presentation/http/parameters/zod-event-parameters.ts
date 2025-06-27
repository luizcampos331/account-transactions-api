import { z } from 'zod';
import { ManageEventsInput } from '@/application/use-cases/manage-events-use-case';
import { ParameterError } from './errors/parameter-error';

class ZodEventParameters {
  public manage(query: any): ManageEventsInput {
    const dataSchema = z.object({
      type: z.enum(['deposit', 'withdraw']),
      destination: z.optional(z.string()),
      origin: z.optional(z.string()),
      amount: z.number(),
    });

    const _query = dataSchema.safeParse(query);

    if (_query.success === false) {
      throw new ParameterError(_query.error.format());
    }

    return _query.data as ManageEventsInput;
  }
}

export default ZodEventParameters;
