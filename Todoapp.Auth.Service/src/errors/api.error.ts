import BaseError from "./base.error";

const API_ERROR = "API_Error";

export default class APIError extends BaseError {
  constructor(
    public readonly status: number,
    public readonly code: string,
    public readonly message: string
  ) {
    super(API_ERROR, status, code, true, message, new Date());
  }
}
