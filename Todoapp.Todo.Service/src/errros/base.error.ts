export default class BaseError extends Error {
  constructor(
    public readonly name: string,
    public readonly statusCode: number,
    public readonly isOperational: boolean,
    public readonly code: string,
    public readonly message: string,
    public readonly date: Date
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name,
    this.statusCode = statusCode,
    this.isOperational = isOperational,
    this.code = code,
    this.date = date

    Error.captureStackTrace(this)
  }
}
