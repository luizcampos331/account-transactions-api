export class ParameterError {
  public readonly message: string;
  public readonly parameters: Record<string, any>;

  constructor(parameters: Record<string, any>) {
    this.message = 'Parameter error';
    this.parameters = parameters;
  }
}
