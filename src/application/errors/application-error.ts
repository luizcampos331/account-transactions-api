export class ApplicationError {
  public readonly data: number;
  public readonly statusCode: number;

  constructor(data: any, statusCode = 400) {
    this.data = data;
    this.statusCode = statusCode;
  }
}
