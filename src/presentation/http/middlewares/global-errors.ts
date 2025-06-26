import { ApplicationError } from '@/application/errors/application-error';
import { ParameterError } from '@/presentation/http/parameters/errors/parameter-error';
import { NextFunction, Request, Response } from 'express';

function globalErrors(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (error instanceof ApplicationError) {
    return response.status(error.statusCode).send(String(error.data));
  }

  if (error instanceof ParameterError) {
    return response.status(400).json({
      message: error.message,
      parameters: error.parameters,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

export default globalErrors;
