import { Request, Response, NextFunction } from "express";
import { filterError } from "../helpers/utils";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filteredError = filterError(err);

  res.status(filteredError.status).json({
    succes: false,
    name: filteredError.name,
    status: filteredError.status,
    code: filteredError.code,
    message: filteredError.message,
  });
};
